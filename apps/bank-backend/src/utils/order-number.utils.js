/**
 * Order Number Utility
 * Generates unique order numbers in format: ORD-YYYY-XXXXXX
 */

class OrderNumberGenerator {
  /**
   * Generate a unique order number
   * Format: ORD-YYYY-XXXXXX (e.g., ORD-2026-000123)
   * @returns {string} Generated order number
   */
  static generate() {
    const year = new Date().getFullYear();
    const randomPart = Math.floor(100000 + Math.random() * 900000); // 6 digits
    return `ORD-${year}-${randomPart}`;
  }

  /**
   * Validate order number format
   * @param {string} orderNumber - Order number to validate
   * @returns {boolean} True if valid format
   */
  static validate(orderNumber) {
    if (!orderNumber) return false;
    
    const pattern = /^ORD-\d{4}-\d{6}$/;
    return pattern.test(orderNumber);
  }

  /**
   * Extract year from order number
   * @param {string} orderNumber - Order number
   * @returns {number|null} Year or null if invalid
   */
  static getYear(orderNumber) {
    if (!this.validate(orderNumber)) return null;
    
    const parts = orderNumber.split('-');
    return parseInt(parts[1]);
  }

  /**
   * Extract sequential number from order number
   * @param {string} orderNumber - Order number
   * @returns {number|null} Sequential number or null if invalid
   */
  static getSequentialNumber(orderNumber) {
    if (!this.validate(orderNumber)) return null;
    
    const parts = orderNumber.split('-');
    return parseInt(parts[2]);
  }
}

module.exports = OrderNumberGenerator;
