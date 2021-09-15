const express = require("express");
const router = express.Router();
const Axios = require("axios");

/**
 * @route DELETE /friend/delete
 * @desc delete a friend from the logged user list
 * @returns {array} of the delete user infos
 */

router.delete("/", async (req, res) => {
    let apiKey = process.env.API_KEY;

    let apiUrl = `https://api.betaseries.com/friends/friend`;
    let token = req.body.token;
    let userId = req.body.id;

    await Axios({
        method: "delete",
        url: apiUrl,
        data: {
            id: userId,
            Token: token,
        },
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
        return res.status(401).json(error.response);
    });
});

module.exports = router;
