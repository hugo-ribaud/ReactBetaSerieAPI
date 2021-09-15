const express = require("express");
const router = express.Router();
const Axios = require("axios");

/**
 * @route GET /favorites/:id
 * @desc finds all the logged user's favorite shows
 * @returns {array} fovorited shows infos
 */

router.get('/:id', async (req, res) => {
    let apiKey = process.env.API_KEY;
    let apiUrl = "https://api.betaseries.com/shows/favorites";

    let id = req.params.id;

    await Axios({
        method: 'get',
        url: apiUrl,
        data: {
            id: id,
            summary: true
        },
        headers: {
            "X-BetaSeries-Key": apiKey,
            "X-BetaSeries-Version": "3.0",
        }
    })
    .then((response) => {
        return res.status(200).json(response.data);
    })
    .catch((error) => {
        return res.status(401).json(error.response.data.errors);
    });
});

module.exports = router;