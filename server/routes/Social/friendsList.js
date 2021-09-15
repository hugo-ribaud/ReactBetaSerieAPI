const express = require("express");
const router = express.Router();
const Axios = require("axios");

/**
 * @route GET /friend/list/:token
 * @desc get the friends list of the logged user
 * @returns {array} of the friends infos
 */

router.get('/:token', async (req, res) => {
    let apiKey = process.env.API_KEY;
    let apiUrl = "https://api.betaseries.com/friends/list";
    let token = req.params.token;

    await Axios.get(apiUrl, {
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
