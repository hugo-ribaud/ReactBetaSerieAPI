const express = require("express");
const router = express.Router();
const Axios = require("axios");

/**
 * @route DELETE /favorites/delete/:token/:id
 * @desc Deletes a show from the favorites shows in the user's account
 * @returns {array} deleted show infos
 */

router.delete('/:token/:id', async (req, res) => {
    let apiKey = process.env.API_KEY;
    let apiUrl = `https://api.betaseries.com/shows/favorite`;
    
    let token = req.params.token;
    let id = req.params.id;

    await Axios({
        method: 'delete',
        url: apiUrl,
        data: {
            id: id,
            Token: token
        },
        headers: {
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