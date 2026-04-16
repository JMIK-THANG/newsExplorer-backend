const {
  NODE_ENV = "development",
  JWT_SECRET = "dev-secret",
  CONNECTION,
  PORT = 3005,
} = process.env;

const MONGO_URI =
  NODE_ENV === "production"
    ? CONNECTION
    : "mongodb+srv://jmikthang5:jmik12345@byterianwebsite.rpu76.mongodb.net/news-explorer_db";

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  MONGO_URI,
};
