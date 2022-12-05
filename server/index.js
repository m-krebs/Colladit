import {WebSocketServer} from 'ws';
import {v4} from 'uuid';
import {parse} from 'url';

const wss = new WebSocketServer({port: 8080});

let lastChange = [{suid: '', content: ''}];

wss.on('connection', (ws, req) => {
  const parameters = parse(req.url, true);
  ws.suid = parameters.query.uuid;
  ws.cuid = v4();
  ws.on('message', (data) => {
    let undef = lastChange.find(c => c.suid === ws.suid) === undefined;
    if (data.toString() === '') {
      if (undef) return;
      ws.send(lastChange.find(c => c.suid).content);
    } else {
      if (undef) lastChange.push({suid: ws.suid, content: data.toString()});
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