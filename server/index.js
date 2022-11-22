import {WebSocketServer} from 'ws';
import {v4} from 'uuid';
import {parse} from 'url';

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