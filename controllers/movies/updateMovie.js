const { Movie } = require("../../models//movieSchema");

const updateMovie = async (req, res) => {
  const { id: movieId } = req.params;
  const { _id: userId } = req.user;

  const movie = await Movie.findOneAndUpdate(
    { owner: userId, _id: movieId },
    { ...req.body },
    { new: true }
  );

  res.status(200).json(movie);
};

module.exports = updateMovie;
