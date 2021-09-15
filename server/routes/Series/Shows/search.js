const express = require("express");
const router = express.Router();
const Axios = require("axios");

/**
 * @route GET /series/search
 * @desc search a show corresponding to the title the user is looking for
 * @returns {array} results of the search with the shows infos
 */

router.get("/", async (req, res) => {

    let apiKey = process.env.API_KEY;

    let title = req.query.title

    let apiUrl = `https://api.betaseries.com/shows/search?title=${title}`;

    await Axios({
        method: "get",
        url: apiUrl,
        data: {
            title: title,
            summary: true,
            nbpp: 6,
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