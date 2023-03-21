const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

//  POST /api/chat

router.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  // Generate a response with the OpenAI API
  try {
    const flightData = await Flight.find();
    const tablefields = [
      "flightNumber",
      "airline",
      "destination",
      "departureTime",
      "terminal",
      "gateNumber",
    ];

    const flightDataString = flightData
      .map(
        (flight) =>
          `${flight.flightNumber}, ${flight.airline}, ${flight.destination}, ${flight.departureTime}, ${flight.terminal}, ${flight.gateNumber}`
      )
      .join("\n");
    const tableFieldsString = tablefields.join(", ");

    const query = `${prompt}\nuse only following data to answer\n\n${tableFieldsString}\n${flightDataString}`;
    console.log("query", query);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
    });

    console.log(response.data.choices[0].message);
    res.status(200).json(response.data.choices[0].message);
  } catch (error) {
    if (error.response) {
      console.log("err", error.response.data);
    } else {
      console.log("err", error.message);
    }
  }
});

module.exports = router;
