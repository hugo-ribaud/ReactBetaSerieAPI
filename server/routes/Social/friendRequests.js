const express = require("express");
const router = express.Router();
const Axios = require("axios");

/**
 * @route GET /friend/requests/:token
 * @desc get all the logged user received friend requests
 * @returns {array} user requesting to be friend info
 */

router.get('/:token', async (req, res) => {
    let apiKey = process.env.API_KEY;
    let apiUrl = "https://api.betaseries.com/friends/requests";
    let token = req.params.token;

    await Axios.get(apiUrl, {
        headers: {
            "Authorization": token,
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