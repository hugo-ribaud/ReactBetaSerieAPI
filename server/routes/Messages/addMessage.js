const express = require("express");
const router = express.Router();
const Axios = require("axios");

/**
 * @route POST /messages/add
 * @desc Sends a message to another user
 * @returns the info of the posted message
 */

router.post('/', async (req, res) => {
    let apiKey = process.env.API_KEY;
    let apiUrl = `https://api.betaseries.com/messages/message`;

    let to = req.body.id;
    let text = req.body.text;
    let title = req.body.title;
    let token = req.body.token;

    await Axios({
        method: 'post',
        url: apiUrl,
        data: {
            to: to,
            text: text,
            title: title,
            Token: token,
        },
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
        return res.status(401).json(error);
    });
});

module.exports = router;