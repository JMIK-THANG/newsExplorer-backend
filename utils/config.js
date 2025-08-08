// const { JWT_SECRET = "dev-secret", NODE_ENV } = process.env;
// module.exports = { JWT_SECRET, NODE_ENV };

const {
  NODE_ENV = "development",
  JWT_SECRET = "dev-secret",
  CONNECTION,
  PORT = 3005,
} = process.env;

const MONGO_URI =
  NODE_ENV === "production"
    ? CONNECTION
    : "mongodb://127.0.0.1:27017/newsexplorer_db";

console.log(process.env);

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  MONGO_URI,
};
