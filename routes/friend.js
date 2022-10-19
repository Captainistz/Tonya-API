const { db } = require('../services/firebase')

const getFriend = async (req, res) => {
  try {
  } catch (e) {
    return res.status(500).json({ data: String(e) })
  }
}

const postFriend = async (req, res) => {
  try {
  } catch (e) {
    return res.status(500).json({ data: String(e) })
  }
}

const deleteFriend = async (req, res) => {
  try {
  } catch (e) {
    return res.status(500).json({ data: String(e) })
  }
}

module.exports = {
  getFriend,
  postFriend,
  deleteFriend,
}
