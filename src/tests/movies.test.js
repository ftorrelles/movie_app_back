const request = require("supertest");
const app = require("../app");
const Genre = require("../models/Genre");
const Director = require("../models/Director");
const Actor = require("../models/Actor");
require("../models");
let movieId;

test("POST /movies should create a new movie", async () => {
    const newMovie = {
        name: "Harry Potter y la piedra filosofal",
        image: "https://lavamagazine.com/wp-content/uploads/2020/05/resumen-de-Harry-Potter-y-la-Piedra-Filosofal-39.jpg",
        synopsis:
            "El día de su cumpleaños, Harry Potter descubre que es hijo de dos conocidos hechiceros, de los que ha heredado poderes mágicos. Debe asistir a una famosa escuela de magia y hechicería, donde entabla una amistad con dos jóvenes que se convertirán en sus compañeros de aventura. Durante su primer año en Hogwarts, descubre que un malévolo y poderoso mago llamado Voldemort está en busca de una piedra filosofal que alarga la vida de quien la posee.",
        releaseYear: 2001,
    };
    const res = await request(app).post("/movies").send(newMovie);
    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newMovie.name);
});

test("GET ALL /movies should resturn all movie", async () => {
    const res = await request(app).get("/movies");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("PUT /movies/:id should update one movie", async () => {
    const body = {
        name: "Harry Potter y la piedra filosofal update",
    };
    const res = await request(app).put(`/movies/${movieId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test("POST /movies/:id/actors should set the movie actors", async () => {
    const actor = await Actor.create({
        firstName: "Daniel Jacob",
        lastName: "Radcliffe",
        nationality: "United Kingdom",
        image: "https://m.media-amazon.com/images/M/MV5BZmE0NzNiNzQtYTVlYS00MjljLWE4MTgtYzYxNjU2NjZkM2M4XkEyXkFqcGdeQXVyNjY5NDgzNjQ@._V1_.jpg",
        birthday: "1989-7-23",
    });
    const res = await request(app)
        .post(`/movies/${movieId}/actors`)
        .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/directors should set the movie directors", async () => {
    const director = await Director.create({
        firstName: "Christopher Joseph",
        lastName: "Columbus",
        nationality: "United state",
        image: "https://m.media-amazon.com/images/I/719WBC3qZTL._SX450_.jpg",
        birthday: "1958-9-10",
    });
    const res = await request(app)
        .post(`/movies/${movieId}/directors`)
        .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/genres should set the movie genres", async () => {
    const genre = await Genre.create({
        name: "crime",
    });
    const res = await request(app)
        .post(`/movies/${movieId}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("DELETE /movies/:id should delete one movie", async () => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
});
