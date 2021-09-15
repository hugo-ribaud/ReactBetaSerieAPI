const express = require("express");
const router = express.Router();
const Axios = require("axios");

/**
 * @route POST /favorites/add
 * @desc Marks a show as favorited in the logged user's account
 * @returns an array containing all the marked show infos
 */

router.post('/', async (req, res) => {
    let apiKey = process.env.API_KEY;
    let apiUrl = "https://api.betaseries.com/shows/favorite";

    let id = req.body.id;
    let token = req.body.token;

    await Axios({
        method: 'post',
        url: apiUrl,
        data: {
            id: id,
            Token: token
        },
        headers : {
            "Authorization": token,
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