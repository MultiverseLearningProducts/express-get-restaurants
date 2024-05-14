const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 
app.get('/restaurants', async (req, res) => {
  const restaurants = await Restaurant.findAll()
  res.json(restaurants)
})

app.get('/restaurants/:id', async (req, res) => {
  const restaurants = await Restaurant.findAll()
  const id = req.params.id
  const restaurant = await Restaurant.findByPk(id)

  if (id >= 1 && id <= restaurants.length) {
    res.json(restaurant)
  } else {
    res.status(404).json({ message: 'Musician not found' });
  }
})

module.exports = app;