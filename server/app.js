require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// connection db import
const connectDB = require("./db/connectDB");

// middleware imports
const cors = require("cors");

const errorHandlerMiddleware = require("./middlewares/error-handlers");
const notFoundRoute = require("./middlewares/not-found");

// route imports
const reciperRouters = require("./routes/recipe");

// use middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/recipes", reciperRouters);

// error handler middleware
app.use(errorHandlerMiddleware);
app.use(notFoundRoute);

// start

const port = process.env.PORT || 5000;

const start = async (db_URL) => {
  try {
    await connectDB(db_URL).then(() => console.log("CONNECTED TO DB!"));
    app.listen(port, () => console.log(`Listening to PORT: ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start(process.env.MONGODB_URI);
