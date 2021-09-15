const express = require("express");
const router = express.Router();
const Axios = require("axios");

/**
 * @route GET /messages/discussion/:token/:id
 * @desc Get all the messages belonging to the same discussion
 * between the logged user and another user
 * @returns All the messages and user infos
 */

router.get('/:token/:id', async (req, res) => {
    let apiKey = process.env.API_KEY;
    let apiUrl = `https://api.betaseries.com/messages/discussion`;

    let token = req.params.token;
    let id = req.params.id;

    await Axios({
        method: 'get',
        url: apiUrl,
        data: {
            id: id
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
        return res.status(401).json(error.response);
    });
});

module.exports = router;