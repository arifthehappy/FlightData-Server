// model for flight

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//define schema
const FlightSchema = new Schema({
  flightNumber: {
    type: String,
    required: true,
  },
  airline: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  terminal: {
    type: String,
    required: true,
  },
  gateNumber: {
    type: String,
    required: true,
  },
});

//export model
module.exports = mongoose.model("Flight", FlightSchema);
