const { db, Timestamp } = require('../services/firebase')

const getAvailableActivity = async (req, res) => {
  try {
    const _res = await db.collection('activity').where('active', '==', true).orderBy('start_time', 'asc').get()
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

const getActivity = async (req, res) => {
  try {
    const _res = await db.collection('activity').doc(req.params['id']).get()
    if (!_res) {
      return res.status(404).json({ data: 'Not found 😶' })
    }
    return res.status(200).json(_res.data())
  } catch (e) {
    return res.status(500).json({ data: String(e) })
  }
}

const postActivity = async (req, res) => {
  try {
    const data = req.body
    const _res = await db.collection('activity').add({
      owner_id: data['owner_id'],
      participant: [],
      max_participant: data['max_participant'],
      active: true,
      start_time: Timestamp.fromDate(new Date(data['start_time'])),
      end_time: Timestamp.fromDate(new Date(data['end_time'])),
      description: data['description'],
      tag: data['tag'],
    })
    if (!_res) {
      throw 'Error occurred'
    }
    return res.status(200).json({ data: 'done 😁' })
  } catch (e) {
    return res.status(500).json({ data: String(e) })
  }
}

module.exports = {
  getAvailableActivity,
  getActivity,
  postActivity,
}
