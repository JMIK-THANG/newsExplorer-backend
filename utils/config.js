const {
  NODE_ENV = "development",
  JWT_SECRET = "dev-secret",
  CONNECTION,
  PORT = 3005,
} = process.env;

const MONGO_URI =
  NODE_ENV === "production"
    ? CONNECTION
    : "mongodb+srv://jmikthang5:jmik123@byterianwebsite.rpu76.mongodb.net/?retryWrites=true&w=majority&appName=byterianWebsite";

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  MONGO_URI,
};
