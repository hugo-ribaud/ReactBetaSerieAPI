const express = require("express");
const router = express.Router();
const Axios = require("axios");

/**
 * @route DELETE /messages/delete/:token/:id
 * @desc Deletes a message the user wrote
 * @returns the deleted message
 */

router.delete('/:token/:id', async (req, res) => {
    let apiKey = process.env.API_KEY;
    let apiUrl = `https://api.betaseries.com/messages/message`;
    
    let token = req.params.token;
    let id = req.params.id;

    await Axios({
        method: 'delete',
        url: apiUrl,
        data: {
            Token: token,
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
        return res.status(401).json(error);
    });
});

module.exports = router;