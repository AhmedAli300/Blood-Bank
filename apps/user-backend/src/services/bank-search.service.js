const BloodBankModel = require('../modules/blood-banks/bank.model')
const InventoryModel = require('../modules/inventory/inventory.model')
const InventoryService = require('./inventory.service')

class BankSearchService {
  static async searchBanks({ blood_type, quantity, governorate, city }) {
    if (!blood_type || !quantity || !governorate || !city) {
      throw new Error('Blood type, quantity, governorate, and city are required')
    }
    InventoryService.validateBloodType(blood_type)
    if (quantity <= 0 || !Number.isInteger(quantity)) {
      throw new Error('Quantity must be a positive integer')
    }
    const locationBanks = await BloodBankModel.findByLocation(governorate, city)
    const governorateBanks = await BloodBankModel.findByGovernorate(governorate)
    const otherCityBanks = governorateBanks.filter(bank => bank.city !== city)
    const allBanks = await BloodBankModel.findAll()
    const processed = await this.processAndScoreBanks(locationBanks, otherCityBanks, allBanks, blood_type, quantity, governorate, city)
    const sorted = this.sortByPriority(processed)
    return {
      banks: sorted,
      search_criteria: { blood_type: blood_type.toUpperCase(), quantity, governorate, city, total_results: sorted.length }
    }
  }

  static sortByPriority(processedResults) {
    const groups = { LOCATION: [], GOVERNORATE: [], FALLBACK: [] }
    for (const bank of processedResults) {
      if (groups[bank.priority_level]) groups[bank.priority_level].push(bank)
      else groups.FALLBACK.push(bank)
    }
    const sortGroup = (grp) => {
      const enough = grp.filter(b => b.availability_status === 'ENOUGH').sort((a, b) => b.available_quantity - a.available_quantity)
      const limited = grp.filter(b => b.availability_status === 'LIMITED').sort((a, b) => b.available_quantity - a.available_quantity)
      const none = grp.filter(b => b.availability_status === 'NOT_AVAILABLE').sort((a, b) => {
        if (b.available_quantity !== a.available_quantity) return b.available_quantity - a.available_quantity
        return a.name.localeCompare(b.name)
      })
      return [...enough, ...limited, ...none]
    }
    return [...sortGroup(groups.LOCATION), ...sortGroup(groups.GOVERNORATE), ...sortGroup(groups.FALLBACK)]
  }

  static async processAndScoreBanks(locationBanks, otherCityBanks, allBanks, bloodType, quantity, userGovernorate, userCity) {
    const results = []
    const seen = new Set()
    for (const bank of locationBanks) {
      const pb = await this.processBank(bank, bloodType, quantity, userGovernorate, userCity, 'LOCATION')
      if (pb) { results.push(pb); seen.add(pb.id) }
    }
    for (const bank of otherCityBanks) {
      if (seen.has(bank.id)) continue
      const pb = await this.processBank(bank, bloodType, quantity, userGovernorate, userCity, 'GOVERNORATE')
      if (pb) { results.push(pb); seen.add(pb.id) }
    }
    for (const bank of allBanks) {
      if (seen.has(bank.id)) continue
      const pb = await this.processBank(bank, bloodType, quantity, userGovernorate, userCity, 'FALLBACK')
      if (pb) { results.push(pb); seen.add(pb.id) }
    }
    return results
  }

  static async processBank(bank, bloodType, quantity, userGovernorate, userCity, priorityLevel) {
    try {
      const inventory = await InventoryModel.findByBankId(bank.id)
      const bloodTypeInventory = inventory.find(item => item.blood_type === bloodType)
      const availableQuantity = bloodTypeInventory ? bloodTypeInventory.quantity : 0
      let baseScore = 0
      if (priorityLevel === 'LOCATION') baseScore = 100
      else if (priorityLevel === 'GOVERNORATE') baseScore = 70
      else baseScore = 30
      let availabilityScore = 0
      if (availableQuantity >= quantity) availabilityScore = 20
      else if (availableQuantity > 0) availabilityScore = Math.floor((availableQuantity / quantity) * 15) + 5
      let locationScore = 0
      if (bank.governorate === userGovernorate) {
        locationScore += 5
        if (bank.city === userCity) locationScore += 5
      }
      const matchScore = baseScore + availabilityScore + locationScore
      let availabilityStatus = 'NOT_AVAILABLE'
      if (availableQuantity >= quantity) availabilityStatus = 'ENOUGH'
      else if (availableQuantity > 0) availabilityStatus = 'LIMITED'
      return {
        id: bank.id,
        name: bank.name,
        governorate: bank.governorate,
        city: bank.city,
        address: bank.address,
        working_hours: bank.working_hours,
        blood_type: bloodType,
        requested_quantity: quantity,
        available_quantity: availableQuantity,
        availability_status: availabilityStatus,
        match_score: matchScore,
        priority_level: priorityLevel
      }
    } catch {
      return null
    }
  }
}

module.exports = BankSearchService
