const express = require("express");
const router = express.Router();
const Axios = require("axios");

/**
 * @route GET /series/discover
 * @query limits the return to 21 show
 * @desc get 21 random shows
 * @returns {array} of the shows infos
 */

router.get('/', async (req, res) => {
    let apiKey = process.env.API_KEY;
    let apiUrl = "https://api.betaseries.com/shows/discover?limit=21";

    await Axios({
        method: 'get',
        url: apiUrl,
        headers: {
            "X-BetaSeries-Key": apiKey,
            "X-BetaSeries-Version": "3.0",
        }
    })
    .then(response => {
        return res.status(200).json(response.data);
    })
    .catch(error => {
        return res.status(401).json(error.response.data.errors);
    });

});

module.exports = router;