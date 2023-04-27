const { Movie } = require("../../models/movieSchema");

const getMovieById = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);

  res.status(200).json(movie);
};

module.exports = getMovieById;
