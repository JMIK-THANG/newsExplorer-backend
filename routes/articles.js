const express = require("express");

const router = express.Router();
const { getUserArticles, createArticle, deleteArticle } = require("../controllers/articles");
const {auth} = require("../middlewares/auth");

router.get("/", auth, getUserArticles);
router.post("/", auth, createArticle);
router.delete("/:articleId", auth, deleteArticle);

module.exports = router;