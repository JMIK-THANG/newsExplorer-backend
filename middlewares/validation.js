const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validateURL).messages({
      "string.uri": 'The "Link" field must be a valid URL',
      "string.empty": 'The "Link" field is required.',
    }),
    image: Joi.string().required().custom(validateURL).message({
      "string.uri": 'The "image" field must be a valid URL',
      "String.empty": 'The "image" field is required.',
    }),
  }),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" fields is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string().required().email().messages({
      "string.email": 'The "email" must be a valid email address',
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().min(7).required().messages({
      "string.min": "The password must be at least 7 characters",
      "string.empry": 'THe "password" field must be filled in',
    }),
  }),
});

const authenticationUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.email": 'The "email" must be a valid email address',
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().min(7).required().messages({
      "string.min": "The password must be at least 7 characters",
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});
const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().length(24).hex().required().messages({
      "string.length": 'The "articledId" must be 24 characters long.',
      "string.hex": 'The "articledId" must be a valid hexadecimal string',
      "string.empty": 'The "articledId" field is required.',
    }),
  }),
});
module.exports = {
  validateCreateArticle,
  validateSignup,
  authenticationUserInfo,
  validateArticleId,
};
