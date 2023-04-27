const { Movie } = require("../../models/movieSchema");

const getUserMovies = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Movie.find({ owner })
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalPages = result.length === 0 ? 1 : Math.ceil(result.length / limit);

  res.status(200).json({ movies: result, totalPages });
};

module.exports = getUserMovies;
