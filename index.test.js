const request = require("supertest");
const app = require("./src/app.js");
const Restaurant = require("./models/Restaurant.js");
const syncSeed = require("./seed.js");
let restQuantity;

beforeAll(async () => {
    await syncSeed();
    const restaurants = await Restaurant.findAll();
    restQuantity = restaurants.length;
    console.log(restQuantity);
})



describe("route tests", () => {
    test("GET /restaurants", async () => {
        const res = await request(app).get("/restaurants");

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0]).toHaveProperty("cuisine");
        expect(res.body.length).toBe(restQuantity);
        expect(res.body).toContainEqual(
            expect.objectContaining({
                id: 1,
                name: "AppleBees",
                location: "Texas",
                cuisine: "FastFood"
            })
        )
    });
}); /*
    test("GET /restaurants/:id", async () => {
        const response = await request(app).get("/restaurants/1");
        expect(response.body).toEqual(
            expect.objectContaining({
                id: 1,
                name: "AppleBees",
                location: "Texas",
                cuisine: "FastFood"
            })
        )
    })

    test("POST /restaurants", async () => {
        console.log(restQuantity);
        console.log(await Restaurant.findAll());

        const response = await request(app)
            .post("/restaurants")
            .send( {name: "Buffalo Wild Wings", location: "Washington", cuisine: "American"} );
        expect(response.body.length).toEqual(restQuantity + 1);
    });
   
}); */