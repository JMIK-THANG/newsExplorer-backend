const express = require("express");
const { errors } = require("celebrate");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
// const { MONGO_URI, PORT } = require("./utils/config");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);


const db = process.env.MONGO_URI;// || "mongodb://127.0.0.1:27017/news-explorer_db";
// mongoose
//   .connect(db)
//   .then(() => {
//     console.log("Connected to DB")
//   })
//   .catch(console.error);
if (!db) {
  throw new Error("MONGO_URI is missing. Check your environment variables.");
}


app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
app.use("/", mainRouter);
app.use(errorLogger);
// Joi validation
app.use(errors());
// centralize middleware
app.use(errorHandler);

// app.listen(process.env.PORT, "0.0.0.0", () => {
//   console.log(`Server is running on http://0.0.0.0:${process.env.PORT}`);
// });

mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to DB");

    const PORT = process.env.PORT || 3005;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });