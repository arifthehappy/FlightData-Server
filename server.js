const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const flightRoutes = require("./routes/flightRoutes");

const URI = process.env.MONGODB_URI;

//port number
const port = 5000 || process.env.PORT;

//setup mongodb
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//on connection
mongoose.connection.on("connected", () => {
  console.log("connected to database mongodb");
});
//on error
mongoose.connection.on("error", (err) => {
  if (err) {
    console.log("error in database connection: " + err);
  }
});

const app = express();

app.use(bodyParser.json());

app.use(cors());

//routes
app.use("/api", flightRoutes);

//index route
app.get("/", (req, res) => {
  res.send("Invalid endpoint");
});

//start server
app.listen(port, () => {
  console.log("server started at port: " + port);
});
