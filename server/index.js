const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/session', (req, res) => {
  res.send('id: ' + req.query.id);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});