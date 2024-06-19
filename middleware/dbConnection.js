const pool = require('../db')

async function ensureDbConnection(req, res, next) {
  let connection
  try {
    connection = await pool.getConnection()
    req.dbConnection = connection
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Failed to connect to the database' })
  } finally {
    if (connection) {
      connection.release()
    }
  }
}

module.exports = ensureDbConnection