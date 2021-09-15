const express = require("express");
const router = express.Router();
const Axios = require("axios");
const md5 = require("md5");

/**
 * @route POST /login
 * @desc Logs the user with an adress email and an hashed password
 * @returns {array} containing infos of the user
 */

router.post("/", async (req, res) => {
    //clé de l'api
    let apiKey = process.env.API_KEY;

    //préparation de la requête à l'api
    let ApiURL = "https://api.betaseries.com/members/auth";

    //récupération des données envoyées dans le body
    let email = req.body.email;
    let password = req.body.password;
    let hashedPassword = md5(password); // hashage mot de passe
    let data = {
        login: email,
        password: hashedPassword,
    };

    //requete à l'api
    await Axios.post(ApiURL, data, {
        headers: {
            "X-BetaSeries-Key": apiKey,
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
