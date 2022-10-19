const { db } = require('../services/firebase')

const getAllUser = async (req, res) => {
  try {
  } catch (e) {
    return res.status(500).json({ data: String(e) })
  }
}

const getUser = async (req, res) => {
  try {
  } catch (e) {
    return res.status(500).json({ data: String(e) })
  }
}

const postUser = async (req, res) => {
  try {
  } catch (e) {
    return res.status(500).json({ data: String(e) })
  }
}

module.exports = {
  getAllUser,
  getUser,
  postUser,
}
