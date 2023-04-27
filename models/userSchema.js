const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");
const passRegexp = /^(?=.{7,32}$)([0-9A-Za-z])*$/;
const nameRegexp = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
const emailRegexp =
  // eslint-disable-next-line no-useless-escape
  /^(?=.{10,63}$)(([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      match: nameRegexp,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },

    accessToken: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  userName: Joi.string().min(1).pattern(nameRegexp).required(),
  email: Joi.string().pattern(emailRegexp).min(10).max(63).required(),
  password: Joi.string().pattern(passRegexp).min(7).max(32).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).min(10).max(63).required(),
  password: Joi.string().pattern(passRegexp).min(7).max(32).required(),
});

const userSchemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  userSchemas,
};
