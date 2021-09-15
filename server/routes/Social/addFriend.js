const express = require("express");
const router = express.Router();
const Axios = require("axios");

/**
 * @route POST /friend
 * @desc adds a friend to the logged user
 * @returns {array} of the added user infos
 */

router.post("/", async (req, res) => {

    let apiKey = process.env.API_KEY;

    let apiUrl = `https://api.betaseries.com/friends/friend`;
    let token = req.body.token;
    let userId = req.body.id;
    let data = {
        id: userId,
        Token: token
    }

    await Axios.post(apiUrl, data, {
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