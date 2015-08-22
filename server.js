import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import bodyParser from 'body-parser'
import Instagram from 'instagram-node-lib'
import dotenv from 'dotenv'

let port = process.env.PORT || 8080;
let static_path = './dist';
let app = express();
let server = http.Server(app);
let io = socketio(server);

dotenv.load();

Instagram.set('client_id', process.env.CLIENT_ID);
Instagram.set('client_secret', process.env.CLIENT_SECRET);

Instagram.tags.subscribe({
  object: 'tag',
  object_id: 'catsofinstagram',
  aspect: 'media',
  callback_url: process.env.CALLBACK_URL,
  type: 'subscription'
});

app.use(express.static(static_path));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: static_path
  })
});

app.get('/gimmecats', (req, res) => {
  Instagram.subscriptions.handshake(req, res);
});

app.post('/gimmecats', (req, res) => {
  res.send();
  Instagram.tags.recent({
    name: req.body[0].object_id,
    complete: (data) => {
      io.sockets.emit('cats', { cat: data } );
    }
  });
});

server.listen(port);
console.log('Listening ...');
