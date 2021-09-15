import Axios from "axios";

export const episodeNonVu = (idEpisode) => {
    let token = localStorage.getItem("token");
    // updateSortList(sortList, idEpisode);
    Axios({
        method: "delete",
        url: "http://localhost:5000/series/episodes/unfinish",
        data: { id: idEpisode, token: token },
    })
        .then((reponse) => {
            // setUpdateButton(false);
            return idEpisode;
        })
        .catch((e) => {
            console.log(e);
        });
};
