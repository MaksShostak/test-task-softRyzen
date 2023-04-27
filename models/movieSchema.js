const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const nameRegexp = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
const textRegexp = /^[A-Za-z0-9\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      match: textRegexp,
      required: true,
    },
    director: {
      type: String,
      match: nameRegexp,
      default: "",
    },
    releaseDate: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

movieSchema.post("save", handleSaveErrors);

const movieAddSchema = Joi.object({
  title: Joi.string().min(2).max(48).pattern(textRegexp).required(),
  director: Joi.string().min(2).max(16).pattern(nameRegexp).required(),
  releaseDate: Joi.date().less("now").required(),
});
const movieUpdateSchema = Joi.object({
  title: Joi.string().min(2).max(48).pattern(textRegexp).optional(),
  director: Joi.string().min(2).max(16).pattern(nameRegexp).optional(),
  releaseDate: Joi.date().less("now").optional(),
}).min(1);

const movieSchemas = {
  movieAddSchema,
  movieUpdateSchema,
};

const Movie = model("movie", movieSchema);

module.exports = {
  Movie,
  movieSchemas,
};
