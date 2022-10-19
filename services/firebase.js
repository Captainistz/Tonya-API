const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')

const serviceAccount = require('./serviceAccount.json')

initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore()

console.log('🔥 Connected to Firestore.')

module.exports = {
  db,
  Timestamp,
  FieldValue,
}
