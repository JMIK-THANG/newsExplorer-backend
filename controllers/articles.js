const Article = require("../models/clothingItem");
const BadRequestError = require("../errors/badRequestError");
const NotFoundError = require("../errors/notFoundError");
const ForbiddenError = require("../errors/forbiddenError");
const { CREATE, SUCCESS } = require("../errors");

const getUserArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) =>res.status(SUCCESS).send(articles))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  const owner = req.user._id;

  ClothingItem.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.status(CREATE).send(article))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid article data."));
      }
      return next(err);
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const owner = req.user._id;

  Article.findById(articleId)
    .orFail()
    .then((article) => {
      if (String(article.owner) !== owner) {
        return next(
          new ForbiddenError("Only the owner can delete this article."),
        );
      }
      return article
        .deleteOne()
        .then(() => res.send({ message: "article deleted." }));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid article ID."));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("article not found."));
      }
      return next(err);
    });
};

module.exports = {
  getUserArticles,
  createArticle,
  deleteArticle,
};
