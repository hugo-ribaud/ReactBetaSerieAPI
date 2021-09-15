import Axios from "axios";

export const saisonUnFinished = (idSaison, idSerie) => {
    let apiUrl = "http://localhost:5000/series/saison/unfinish";
    let token = localStorage.getItem("token");
    // let idSerie = episodes.id;
    let saison = idSaison + 1;

    Axios({
        method: "delete",
        url: apiUrl,
        data: {
            id: idSerie,
            token: token,
            saison: saison,
        },
    }).then((response) => {
        // let result = response.data.episodes;
        // result.map((value, ind) => {
        //     let result = _.find(sortList[idSaison], { id: value.id });
        //     result.user.seen = false;
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
