const request = require("supertest");
const app = require("../app");
let actorId;
require("../models");

test("POST /actors should create an actor", async () => {
    const newActor = {
        firstName: "Daniel Jacob",
        lastName: "Radcliffe",
        nationality: "United Kingdom",
        image: "https://m.media-amazon.com/images/M/MV5BZmE0NzNiNzQtYTVlYS00MjljLWE4MTgtYzYxNjU2NjZkM2M4XkEyXkFqcGdeQXVyNjY5NDgzNjQ@._V1_.jpg",
        birthday: "1989-7-23",
    };
    const res = await request(app).post("/actors").send(newActor);
    actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newActor.firstName);
});

test("GET ALL /actors should return all actor", async () => {
    const res = await request(app).get("/actors");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("PUT /actors/:id should update one actor", async () => {
    const body = {
        firstName: "Daniel Jacob update",
    };
    const res = await request(app).put(`/actors/${actorId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test("DELETE /actors/:id should delete one actor", async () => {
    const res = await request(app).delete(`/actors/${actorId}`);
    expect(res.status).toBe(204);
});
