const request = require("supertest");
const app = require('./src/app');
const syncSeed = require("./seed");
const Restaurant = require("./models");
let restQuantity;
beforeAll( async () => {
    await syncSeed();
    const restaurants = await Restaurant.findAll({})
    restQuantity = restaurants.length
});

describe("connection tests", () => {

    test("get/restaurants status code verify", async () => {
        const response = await request(app).get("/restaurants");
        expect(response.statusCode).toBe(200);
    })

    test("get/rest returns proper array", async () => {
        const response = await request(app).get("/restaurants");
        expect(Array.isArray(response.body)).toBe(true)
    })

    test("get/rest returns proper number of array elements", async () => {
        const response = await request(app).get("/restaurants");
        expect(response.body.length).toBe(restQuantity)
    })

    test("get/ rest returns correct data", async () => {
        const response = await request(app).get("/restaurants");
        expect(response.body).toContainEqual(
            expect.objectContaining({
                id: 1,
                name: 'AppleBees',
                location: 'Texas',
                cuisine: 'FastFood'
            })
        )
    })

    test("route returns proper spot in array", async () => {
        const response = await request(app).get("/restaurants/1");
        expect(response.body).toEqual(
            expect.objectContaining({
                id: 1,
                name: 'AppleBees',
                location: 'Texas',
                cuisine: 'FastFood'
            })
        )
    })


    test("route places new post at end of array ", async () => {
        await request(app)
        .post("/restaurants")
        .send({name: "asd", location: "qwe", cuisine: "zxc"});
        const restaurant = await Restaurant.findByPk(7);
        expect(restaurant.name).toEqual("asd")
    })

    test("route updates proper spot in array", async () => {
        const response = await request(app)
        .put("/restaurants/1")
        .send({name: "asd", location: "qwe", cuisine: "zxc"});
        const restaurant = await Restaurant.findByPk(1);
        expect(restaurant.name).toEqual('asd')
        
    })


    test("route properly deletes spot in array", async () => {
        const response = await request(app)
        .delete("/restaurants/1")
        let restaurant = await Restaurant.findAll()
        expect(restaurant.length).toEqual(restQuantity)
    })



        

    
})