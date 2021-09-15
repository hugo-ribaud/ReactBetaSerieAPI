const express = require("express");
const router = express.Router();
const Axios = require("axios");

/**
 * @route POST /series/archive
 * @desc adds a show to the logged user archives
 * @return {array} of the archived show
 */

router.post("/", async (req, res) => {
    let apiKey = process.env.API_KEY;
    let apiUrl = "https://api.betaseries.com/shows/archive";

    let showId = req.body.id;
    let token = req.body.token;

    let data = {
        id: showId,
    };

    await Axios.post(apiUrl, data, {
        headers: {
            Authorization: token,
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
