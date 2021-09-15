import Axios from "axios";

export const episodeVu = (idEpisode) => {
    let apiUrl = "http://localhost:5000/series/episodes/finish";
    let token = localStorage.getItem("token");
    // updateSortList(sortList, idEpisode);
    Axios.post(apiUrl, {
        id: idEpisode,
        token: token,
    }).then(() => {
        // setUpdateButton(false);
        return idEpisode;
    });
};
