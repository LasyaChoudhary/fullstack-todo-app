const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_KEY}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
  console.log("REAL ERROR:", error.response?.data || error.message);
  res.status(500).json({ error: "Unable to fetch weather data" });
}

});

module.exports = router;
