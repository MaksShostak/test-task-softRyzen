const { Movie } = require("../../models/movieSchema");

const addMovie = async (req, res) => {
  const { _id: owner } = req.user;

  const movie = await Movie.create({
    ...req.body,
    owner,
  });
  res.status(201).json(movie);
};

module.exports = addMovie;
