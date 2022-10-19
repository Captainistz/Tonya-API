const fs = require('fs')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'morgan.log'), { flags: 'a' })

app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))
app.use(morgan('combined', { stream: accessLogStream }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('method-override')())
app.use(express.static(__dirname + '/public'))

app.get('/', (_req, res) => {
  return res.json({ data: 'Tonya backend 1.0 😎' })
})

//user
app.get('/user', require('./routes/user').getAllUser)
app.get('/user/:id', require('./routes/user').getUser)

app.post('/user', require('./routes/user').postUser)

//activity
app.get('/activity', require('./routes/activity').getAvailableActivity)
app.get('/activity/:id', require('./routes/activity').getActivity)

app.post('/activity', require('./routes/activity').postActivity)

app.put('/activity/:id', require('./routes/activity').updateActivity)

//friend
app.get('/friend/:id', require('./routes/friend').getFriend)

app.post('/friend/:id', require('./routes/friend').postFriend)

app.delete('/friend/:id', require('./routes/friend').deleteFriend)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log('🚀 Listening at http://localhost:' + server.address().port)
})
