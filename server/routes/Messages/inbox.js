const express = require("express");
const router = express.Router();
const Axios = require("axios");

/**
 * @route GET /messages/inbox/:toke
 * @desc Get all the messages sent and received by the logged user
 * @returns an array of all the messages
 */

router.get('/:token', async (req, res) => {
    let apiKey = process.env.API_KEY;
    let apiUrl = `https://api.betaseries.com/messages/inbox`;

    let token = req.params.token;

    await Axios({
        method: 'get',
        url: apiUrl,
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
        return res.status(401).json(error.response);
    });
});

module.exports = router;