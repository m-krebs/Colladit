import express from 'express';
import {DataStore} from './dataStore.js';
import {sessions} from './dataStore.js';
import cors from 'cors';
import {WebSocketServer} from 'ws';
import {v4} from 'uuid';
import {parse} from 'url';


const PORT = process.env.PORT || 3001;

const app = express();

// Headless websocket server that prints any incoming event

const wss = new WebSocketServer({port: 8080});
wss.on('connection', (ws, req)=>{
  const parameters = parse(req.url, true);
  ws.suid = parameters.query.uuid;
  ws.cuid = v4();
  ws.on('message', (data)=>{
    console.log('received: %s', data);
    let cnt = 0;
    wss.clients.forEach((c)=>{
      if (c.suid===ws.suid && c.cuid !== ws.cuid){
        console.log("WHY: " + data);
        cnt++;
        console.log("send %s times", cnt);
        c.send(data.toString());
      }
    });
  });
});

app.use(express.text());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.get('/api/clients', (req, res) => {
  wss.clients.forEach(c=>console.log(c));
  res.sendStatus(200);
})

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