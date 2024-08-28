import { pool } from '../db.js'

export const ping = (req, res) => res.send('Pong')

export const stillAlive = async (req, res) => {
  const [result] = await pool.query('SELECT 1 + 1 AS result')
  res.json(result)
}
