//error handling in  express
require("express-async-errors");

//express
const express = require("express");
const app = express();

//packages
const bodyParser = require("body-parser");
const cors = require("cors");

//router and database
const poultryRouter = require("./router/poultry");
const connectDB = require("./db/connect");

//middleware imports
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middlewares packages
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use("/api/v1/poultry", poultryRouter);

//add middleware routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 3000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, console.log("Server is running on port " + port + "...."));
  } catch (error) {
    console.log("Error While trying to connect to DB.");
    throw error;
  }
};

start();
