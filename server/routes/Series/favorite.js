const express = require("express");
const router = express.Router();
const Axios = require("axios");

router.get("/:token", async (req, res) => {
    await Axios.get("https://api.betaseries.com/shows/member", {
        headers: {
            Authorization: req.params.token,
            "X-BetaSeries-Key": process.env.API_KEY,
            "X-BetaSeries-Version": "3.0",
        },
    })
        .then((response) => {
            return res.status(200).json(response.data);
        })
        .catch((error) => {
            return res.status(401).json(error.response.data.errors);
        });
});

module.exports = router;
