const express = require("express");
const router = express.Router();
const Axios = require("axios");

/**
 * @route GET /series/news
 * @desc get the latest news about the shows the logged user follows
 * @return {array} news infos
 */

router.get("/", async (req, res) => {

    let apiKey = process.env.API_KEY;
    let apiUrl = "https://api.betaseries.com/news/last";

    await Axios({
        method: "get",
        url: apiUrl,
        data: {
            tailored: true,
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
        return res.status(401).json(error.response);
    });
});

module.exports = router;