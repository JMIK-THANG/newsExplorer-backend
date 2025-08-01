const express = require("express");
const router = express.Router();
const { getCurrentUser, signin, signup } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { validateCreateArticle, validateSignup } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.post("/signup",validateSignup, signup);
router.post("/signin",validateCreateArticle, signin);
module.exports = router;
