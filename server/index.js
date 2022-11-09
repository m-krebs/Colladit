import express from "express";
import {DataStore} from './dataStore.js';
import {sessions} from './dataStore.js';
import cors from 'cors';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.text());
app.use(cors({
  origin: "http://localhost:3000"
}))

app.post('/api/session', (req, res) => {
  let exArr = sessions.find(s=>{return s.id===req.query.id})
  if(exArr===undefined){
    sessions.push(new DataStore(req.query.id));
    // res.send(sessions.find(s=>{return s.id===req.query.id}).data)
    res.status(200).send("Created new Session")
    return;
  }
  if(req.body.length>0) {
    exArr.data.length = 0;
    exArr.data.push(req.body);
  }
  console.log(sessions)
  console.log(exArr.data)
  res.json(exArr.data);
});

app.get('/api/sessions', (req, res)=> {
  res.send(sessions)
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});