import express from "express";
import {DataStore} from './dataStore.js';
import {sessions} from './dataStore.js';

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/api/session', (req, res) => {
  let arr = sessions.find(s=>{return s.id===req.query.id})
  if(arr===undefined){
    sessions.push(new DataStore(req.query.id));
    res.send(sessions.find(s=>{return s.id===req.query.id}).data)
    return;
  }
  console.log(arr)
  res.send(arr.data);
});

app.get('/api/sessions', (req, res)=> {
  res.send(sessions)
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});