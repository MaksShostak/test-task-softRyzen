const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate } = require("../../middlewares");

const { userSchemas } = require("../../models/userSchema");

router.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  ctrlWrapper(ctrl.register)
);
router.post(
  "/login",
  validateBody(userSchemas.loginSchema),
  ctrlWrapper(ctrl.login)
);
router.get("/current", authenticate, ctrlWrapper(ctrl.current));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
