const express = require("express");
const router = express.Router();
const Axios = require("axios");

/**
 * @route GET /user/:id
 * @desc get the info of the logged user
 * @returns {array} of the logged user infos
 */

router.get('/:id', async (req, res) => {
    let apiKey = process.env.API_KEY;
    let apiUrl = `https://api.betaseries.com/members/infos`;
    let id = req.params.id;

    await Axios({
        method: 'get',
        url: apiUrl,
        data: {
            id: id,
            nbpp: 20
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
        return res.status(401).json(error.response);
    });
});

module.exports = router;