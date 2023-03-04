const Genre = require("./Genre");
const Movie = require("./Movie");
const Actor = require("./Actor");
const Director = require("./Director");

Movie.belongsToMany(Genre, { through: "MoviesGenres" });
Genre.belongsToMany(Movie, { through: "MoviesGenres" });

Movie.belongsToMany(Actor, { through: "MoviesActors" });
Actor.belongsToMany(Movie, { through: "MoviesActors" });

Movie.belongsToMany(Director, { through: "MoviesDirectors" });
Director.belongsToMany(Movie, { through: "MoviesDirectors" });
