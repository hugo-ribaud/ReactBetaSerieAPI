const express = require("express");
const router = express.Router();
const Axios = require("axios");

router.delete("/", async (req, res) => {
  let apiKey = process.env.API_KEY;

  let apiUrl = "https://api.betaseries.com/seasons/watched";
  let token = req.body.token;
  let idSerie = req.body.id;
  let idSaison = req.body.saison;

  await Axios({
    method: "delete",
    url: apiUrl,
    data: {
      id: idSerie,
      token: token,
      season: idSaison,
    },
    headers: {
      "X-BetaSeries-Key": apiKey,
      "X-BetaSeries-Version": "3.0",
    },
  })
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((error) => {
      return res.status(401).json(error.response.data.errors);
    });
});

module.exports = router;
