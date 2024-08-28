/* eslint-disable camelcase */
import { pool } from '../db.js'

export const getMessages = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM message'
    )
    res.json(rows)
  } catch (error) {
    return res.status(500).json({
      message: 'Something failed'
    })
  }
}

export const getMessage = async (req, res) => {
  const id = req.params.id

  try {
    const [rows] = await pool.query(
      'SELECT * FROM message WHERE id = ?',
      [id]
    )

    if (rows) {
      return res.status(404).json({
        message: 'Message doesn\'t exist'
      })
    }

    res.json(...rows)
  } catch (error) {
    return res.status(500).json({
      message: 'Something failed'
    })
  }
}

export const createMessage = async (req, res) => {
  const { sender_name, sender_email, content } = req.body

  try {
    if (!sender_name || !sender_email || !content) {
      return res.status(409).json({
        message: 'Campos Null no permitidos'
      })
    }

    const [rows] = await pool.query(
      'INSERT INTO message (creation_date, sender_name, sender_email, content) VALUES (NOW(1), ?, ?, ?);',
      [sender_name, sender_email, content]
    )

    res.send({
      id: rows.insertId,
      sender_name,
      sender_email,
      content
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Something failed'
    })
  }
}

export const updateAllMessage = async (req, res) => {
  const id = req.params.id
  const { sender_name, sender_email, content } = req.body

  try {
    const [response] = await pool.query(
      'UPDATE message SET sender_name = ?, sender_email = ?, content = ? WHERE id = ?',
      [sender_name, sender_email, content, id]
    )

    if (!response.affectedRows) {
      return res.status(404).json({
        message: 'Message doesn\'t exist'
      })
    }

    if (response.affectedRows && !response.changedRows) {
      return res.status(205)
    }

    res.sendStatus(201)
  } catch (error) {
    return res.status(500).json({
      message: 'Something failed'
    })
  }
}

export const updateSomeInMessage = async (req, res) => {
  const id = req.params.id
  const { sender_name, sender_email, content } = req.body

  try {
    const [response] = await pool.query(
      'UPDATE message SET sender_name = IFNULL(?, sender_name), sender_email = IFNULL(?, sender_email), content = IFNULL(?, content) WHERE id = ?',
      [sender_name, sender_email, content, id]
    )

    if (!response.affectedRows) {
      return res.status(404).json({
        message: 'Message doesn\'t exist'
      })
    }

    if (response.affectedRows && !response.changedRows) {
      return res.status(205)
    }

    res.sendStatus(201)
  } catch (error) {
    return res.status(500).json({
      message: 'Something failed'
    })
  }
}

export const deleteMessage = async (req, res) => {
  const id = req.params.id

  try {
    const [response] = await pool.query(
      'DELETE FROM message WHERE id = ?',
      [id]
    )

    if (!response.affectedRows) {
      return res.status(404).json({
        message: 'Message doesn\'t exist'
      })
    }

    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
      message: 'Something failed'
    })
  }
}
