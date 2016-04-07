const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const bodyParser = require('body-parser')
const Instagram = require('instagram-node-lib')

const port = process.env.PORT || 8080
const static_path = './dist'
const app = express()
const server = http.Server(app)
const io = socketio(server)

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

Instagram.set('client_id', process.env.CLIENT_ID)
Instagram.set('client_secret', process.env.CLIENT_SECRET)

Instagram.tags.subscribe({
  object: 'tag',
  object_id: 'catsofinstagram',
  aspect: 'media',
  callback_url: process.env.CALLBACK_URL,
  type: 'subscription'
})

app.use(express.static(static_path))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.sendFile('index.html', {
    root: static_path
  })
})

app.get('/gimmecats', function (req, res) {
  Instagram.subscriptions.handshake(req, res)
})

app.post('/gimmecats', function (req, res) {
  res.send()
  Instagram.tags.recent({
    name: req.body[0].object_id,
    complete: (data) => {
      io.sockets.emit('cats', { cat: data })
    }
  })
})

server.listen(port)
console.log('Listening ...')
