import express from 'express';
import {DataStore} from './dataStore.js';
import {sessions} from './dataStore.js';
import cors from 'cors';
import {WebSocketServer} from 'ws';

const PORT = process.env.PORT || 3001;

const app = express();

// Headless websocket server that prints any incoming event
const wss = new WebSocketServer({port:8080});
wss.on('connection', socket => {
  socket.on('message', message => console.log('received: %s', message));
});

const server = app.listen(3002);
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, socket => {
    wss.emit('connection', socket, request);
  });
});

app.use(express.text());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.get('/api/sessions', (req, res) => {
  res.send(sessions);
});

app.post('/api/session/:id', (req, res) => {
  let ses = sessions.find(s => {
    return s.id === req.params.id;
  });
  // If session doesn't exist -> create new one
  if (ses === undefined) {
    sessions.push(new DataStore(req.params.id));
    return res.status(200).send('Created new Session');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});