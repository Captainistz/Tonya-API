const { db, FieldValue } = require('../services/firebase')

const getAllUser = async (_req, res) => {
  try {
    const _res = await db.collection('user').get()
    if (_res.empty) {
      return res.status(404).json({ data: 'Not found 😶' })
    }
    const data = {}
    _res.forEach((e) => {
      data[e.id] = e.data()
    })
    return res.status(200).json(data)
  } catch (e) {
    return res.status(500).json({ data: String(e) })
  }
}

const getUser = async (req, res) => {
  try {
    const _res = await db.collection('user').doc(req.params['id']).get()
    if (!_res) {
      return res.status(404).json({ data: 'Not found 😶' })
    }
    return res.status(200).json(_res.data())
  } catch (e) {
    return res.status(500).json({ data: String(e) })
  }
}

const getUserFriend = async (req, res) => {
  try {
    const _res = await db.collection('user').doc(req.params['id']).get()
    if (!_res) {
      return res.status(404).json({ data: 'Not found 😶' })
    }
    return res.status(200).json({ friend: _res.data()['friend'] })
  } catch (e) {
    return res.status(500).json({ data: String(e) })
  }
}

const getUserActivity = async (req, res) => {
  try {
  } catch (e) {
    return res.status(500).json({ data: String(e) })
  }
}

const postUser = async (req, res) => {
  try {
    const check = await db.collection('user').doc(req.body['uid']).get()
    if (check.data()) {
      return res.status(200).json({ data: 'existed 😁' })
    }
    const _res = await db.collection('user').doc(req.body['uid']).set(
      {
        name: req.body['name'],
        email: req.body['email'],
        tel: req.body['tel'],
        friend: [],
      },
      { merge: 1 }
    )
    if (!_res) {
      throw 'Error occurred'
    }
    return res.status(200).json({ data: 'done 😁' })
  } catch (e) {
    return res.status(500).json({ data: String(e) })
  }
}

const postUserFriend = async (req, res) => {
  try {
    const _res = await db
      .collection('user')
      .doc(req.params['id'])
      .update(
        {
          friend: FieldValue.arrayUnion(req.body['uid']),
        },
        { merge: 1 }
      )
    if (!_res) {
      throw 'Error occurred'
    }
    return res.status(200).json({ data: 'done 😁' })
  } catch (e) {
    return res.status(500).json({ data: String(e) })
  }
}
const deleteUserFriend = async (req, res) => {
  try {
    const _res = await db
      .collection('user')
      .doc(req.params['id'])
      .update(
        {
          friend: FieldValue.arrayRemove(req.body['uid']),
        },
        { merge: 1 }
      )
    if (!_res) {
      throw 'Error occurred'
    }
    return res.status(200).json({ data: 'done 😁' })
  } catch (e) {
    return res.status(500).json({ data: String(e) })
  }
}

module.exports = {
  getAllUser,
  getUser,
  getUserFriend,
  getUserActivity,
  postUser,
  postUserFriend,
  deleteUserFriend,
}
