import Axios from "axios";

export const saisonFinished = (idSaison, idSerie) => {
    let apiUrl = "http://localhost:5000/series/saison/finish";
    let token = localStorage.getItem("token");
    // let idSerie = episodes.id;
    let saison = idSaison + 1;

    Axios.post(apiUrl, {
        id: idSerie,
        token: token,
        saison: saison,
    }).then((response) => {
        // let result = response.data.episodes;
        // result.map((value, ind) => {
        //     let result = _.find(sortList[idSaison], { id: value.id });
        //     result.user.seen = true;
        //     if (ind === sortList[idSaison].length - 1) {
        //         if (updateSaison === true) {
        //             setUpdateSaison(false);
        //         } else {
        //             setUpdateSaison(true);
        //         }
        //     }
        // });
        window.location.reload(false);
    });
};
