const express = require("express");
const Flight = require("../models/Flight");

const router = express.Router();

// post a flight
router.post("/flight", async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    res.status(400).json({ message: error.message + "Could not save flight" });
  }
});

// get all flights
router.get("/flights", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message + "Could not get flights" });
  }
});

module.exports = router;
