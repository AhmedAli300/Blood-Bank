const pool = require('../config/db.config')

const query = async (text, params = [], client = null) => {
  if (client) {
    return await client.query(text, params)
  }
  return await pool.query(text, params)
}

const withTransaction = async (callback) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await callback(client)
    await client.query('COMMIT')
    return result
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

const transaction = async (queries) => {
  return await withTransaction(async (client) => {
    const results = []
    for (const { text, params } of queries) {
      results.push(await client.query(text, params))
    }
    return results
  })
}

module.exports = { query, withTransaction, transaction, pool }
