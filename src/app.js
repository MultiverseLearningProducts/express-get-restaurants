const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (request, response) => {
    const restaurants = await Restaurant.findAll();

    response.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant);
});

app.use(express.json());
app.use(express.urlencoded());

app.post("/restaurants", async (req, res) => {
    const restaurant = await Restaurant.create(req.body);
    const allRestaurant = await Restaurant.findAll();
    res.json(allRestaurant);
});

app.put("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.update(req.body, {where: {id: req.params.id}});
    res.json(restaurant);
});

app.delete("/restaurants/:id", async (req, res) => {
    const delRestaurant = await Restaurant.destroy({where: {id: req.params.id}});
    res.json(delRestaurant);
});

module.exports = app;