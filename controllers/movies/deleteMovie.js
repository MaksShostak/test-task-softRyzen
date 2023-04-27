const { Movie } = require("../../models/movieSchema");

const deleteMovie = async (req, res) => {
  const { id: movieId } = req.params;
  const { _id: userId } = req.user;
  const movie = await Movie.findOneAndRemove({
    owner: userId,
    _id: movieId,
  });

  res.status(200).json({
    message: `notice with id: ${movieId} has been deleted`,
    title: movie.title,
    director: movie.director,
    releaseDate: movie.releaseDate,
    owner: movie.owner,
    _id: movie._id,
    createdAt: movie.createdAt,
    updatedAt: movie.updatedAt,
  });
};

module.exports = deleteMovie;
