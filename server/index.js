import {WebSocketServer} from 'ws';
import {v4} from 'uuid';
import {parse} from 'url';
import cors from 'cors';
import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const corsOptions = {
  origin: process.env.REACT_MACHINE,
  optionsSuccessStatus: 200,
};

const socketPort = process.env.SOCKET_PORT;
const wss = new WebSocketServer({port: socketPort});

let lastChange = [{suid: '', content: ''}];

wss.on('connection', (ws, req) => {
  const parameters = parse(req.url, true);
  ws.suid = parameters.query.uuid;
  ws.cuid = v4();
  ws.on('message', (data) => {
    let search = lastChange.find(c => c.suid === ws.suid);
    if (data.toString() === '') {
      if (search === undefined) return;
      ws.send(search.content);
    } else {
      if (search === undefined) lastChange.push(
          {suid: ws.suid, content: data.toString()});
      else {
        for (const obj of lastChange) {
          if (obj.suid === ws.suid) {
            obj.content = data.toString();
          }
        }
      }
      wss.clients.forEach((c) => {
        if (c.suid === ws.suid && c.cuid !== ws.cuid) {
          c.send(data.toString());
        }
      });
    }
  });
});

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.get('/api/sessions', (req, res) => {
  let clients = [];
  wss.clients.forEach(object => {
    const client = clients.find(client => client.suid === object.suid);
    if (client) {
      client.cuids.push(object.cuid);
    } else {
      clients.push({suid: object.suid, cuids: [object.cuid]});
    }
  });
  res.json(clients);
});

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
