const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/movies");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate, isValidId } = require("../../middlewares");

const { movieSchemas } = require("../../models/movieSchema");

router.get("/user", authenticate, ctrlWrapper(ctrl.getUserMovies));
router.post(
  "/",
  authenticate,
  validateBody(movieSchemas.movieAddSchema),
  ctrlWrapper(ctrl.addMovie)
);
router.get("/:id", isValidId, ctrlWrapper(ctrl.getMovieById));
router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.deleteMovie));
router.patch(
  "/:id",
  authenticate,
  isValidId,
  validateBody(movieSchemas.movieUpdateSchema),
  ctrlWrapper(ctrl.updateMovie)
);

module.exports = router;
