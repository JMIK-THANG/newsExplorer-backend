const router = require("express").Router();
const userRouter = require("./user");
const articleRouter = require("./articles");
const { signin, signup } = require("../controllers/users");
const {
  validateSignup,
  authenticationUserInfo,
} = require("../middlewares/validation");
const NotFoundError = require("../errors/notFoundError");

router.use("/users", userRouter);
router.use("/articles", articleRouter);

router.post("/signin", authenticationUserInfo, signin);
router.post("/signup", validateSignup, signup);

router.use(() => {
  throw new NotFoundError("Page not found.");
});

module.exports = router;
