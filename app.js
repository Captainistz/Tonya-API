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
app.post('/user', require('./routes/user').postUser)

app.get('/user/:id', require('./routes/user').getUser)

app.get('/user/:id/friend', require('./routes/user').getUserFriend)
app.post('/user/:id/friend', require('./routes/user').postUserFriend)
app.delete('/user/:id/friend', require('./routes/user').deleteUserFriend)

app.get('/user/:id/activity', require('./routes/user').getUserActivity)

//activity
app.get('/activity', require('./routes/activity').getAvailableActivity)
app.post('/activity', require('./routes/activity').postActivity)

app.get('/activity/:id', require('./routes/activity').getActivity)


const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log('🚀 Listening at http://localhost:' + server.address().port)
})
