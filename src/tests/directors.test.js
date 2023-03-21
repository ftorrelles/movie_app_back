const request = require("supertest");
const app = require("../app");
let directorId;
require("../models");

test("POST /directors should create a director", async () => {
    const newDirector = {
        firstName: "Christopher Joseph",
        lastName: "Columbus",
        nationality: "United state",
        image: "https://m.media-amazon.com/images/I/719WBC3qZTL._SX450_.jpg",
        birthday: "1958-9-10",
    };
    const res = await request(app).post("/directors").send(newDirector);
    directorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newDirector.firstName);
});

test("GET ALL /directors should return all director", async () => {
    const res = await request(app).get("/directors");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("PUT /directors/:id should update one director", async () => {
    const body = {
        firstName: "Daniel Jacob update",
    };
    const res = await request(app).put(`/directors/${directorId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test("DELETE /directors/:id should delete one director", async () => {
    const res = await request(app).delete(`/directors/${directorId}`);
    expect(res.status).toBe(204);
});
