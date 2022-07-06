const express = require('express');
const app = express();
//const {Restaurant} = require("./models/index")
const data = require('./seedData');

const port = 3000;

//TODO: Create your GET Request Route Below:
app.use(express.json());

app.get('/restaurants', (req, res) => {
  res.status(200).json(data);
});

app.listen(port, () => {
  console.log('Your server is listening on port ' + port);
});
