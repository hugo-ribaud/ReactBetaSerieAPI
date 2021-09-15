const express = require("express");
const router = express.Router();
const Axios = require("axios");
const { response } = require("express");

router.get("/:id/", async (req, res) => {
    let apiKey = process.env.API_KEY;
    let apiUrl = "https://api.betaseries.com/shows/display";
    let idSerie = req.params.id;

    await Axios({
        method: "get",
        url: apiUrl,
        data: {
            id: idSerie,
        },
        headers: {
            "X-BetaSeries-Key": apiKey,
            "X-BetaSeries-Version": "3.0",
        },
    })
        .then((response) => {
            res.status(200).json(response.data);
        })
        .catch((error) => {
            res.status(401).json(error.response.data.errors);
        });
});

module.exports = router;
