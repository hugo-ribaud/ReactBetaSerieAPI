const express = require("express");
const router = express.Router();
const Axios = require("axios");
const _ = require("lodash");

router.get("/:token/:id", async (req, res) => {
    let apiKey = process.env.API_KEY;
    let apiUrl = "https://api.betaseries.com/shows/episodes";
    let token = req.params.token;
    let idSerie = req.params.id;

    await Axios({
        method: "get",
        url: apiUrl,
        data: {
            // showId: idSerie,
            id: idSerie,
            token: token,
        },
        headers: {
            "X-BetaSeries-Key": apiKey,
            "X-BetaSeries-Version": "3.0",
        },
    })
        .then((response) => {
            let tableau = response.data.episodes;
            let newArray = [];
            if (tableau.length > 0) {
                let maxSaison = _.maxBy(tableau, "season").season;

                for (let index = 1; index <= maxSaison; index++) {
                    let seasonSearch = _.filter(tableau, { season: index });
                    newArray.push(seasonSearch);
                }
            }
            res.status(200).json(newArray);
        })
        .catch((error) => {
            res.status(401).json(error.response.data.errors);
        });
});

module.exports = router;
