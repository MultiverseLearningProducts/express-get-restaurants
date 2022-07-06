const express = require('express');
const app = express();
//const {Restaurant} = require("./models/index")
let data = require('./seedData');

const port = 3000;

//TODO: Create your GET Request Route Below:
app.use(express.json());

//GET ALL
app.get('/restaurants', (req, res) => {
  res.status(200).json(data);
});

//GET ONE BY ID
app.get('/restaurants/:id', (req, res) => {
  const productId = Number(req.params.id);
  const result = data.filter((product) => product.id === productId);
  res.status(200).json(result);
});

//UPDATE ONE BY ID
app.put('/restaurants/:id', (req, res) => {
  const newData = req.body;
  const productId = Number(req.params.id);
  let index;

  data.forEach((item) => {
    if (item.id === productId) {
      index = data.indexOf(item);
    }
  });

  data[index] = { ...newData };

  res.status(200).json(data);
});

//CREATE
app.post('/restaurants', (req, res) => {
  const id = Math.floor(Math.random() * 1000000000);
  const newItem = { ...req.body, id };
  data.push(newItem);
  res.status(200).json(data);
});

//DELETE
app.delete('/restaurants/:id', (req, res) => {
  const productId = Number(req.params.id);
  const newData = data.filter((product) => product.id != productId);
  data = [...newData];
  res.status(200).json(data);
});

app.listen(port, () => {
  console.log('Your server is listening on port ' + port);
});
