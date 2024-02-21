const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");
const restaurantRoute = require('../models/Restaurant')
app.use()
app.use(express.json());
app.use(express.urlencoded());

//TODO: Create your GET Request Route Below: 

app.get("/restaurants", async (request, response) => {
    const restaurants = await Restaurant.findAll();
    response.json(restaurants)
})

app.get("/restaurants/:id", async (req, res) => {
    const id = req.params.id;
    const foundRest = await Restaurant.findByPk(id);
    res.json(foundRest);
})

app.post("/restaurants", async (req, res) => {
    const restaurants = await Restaurant.create(req.body)
    res.json({restaurants})
})

app.put("/restaurants/:id", async (req, res) => {
    const replacement = await Restaurant.findByPk(req.params.id)
    const updatedRestaurant = await replacement.update(req.body);
    res.json(updatedRestaurant)
})

app.delete("/restaurants/:id", async (req, res) => {
    const id = req.params.id
    const deleted = await Restaurant.destroy({where: {
        id: id
    },
})
    res.json(deleted)
})



module.exports = app;