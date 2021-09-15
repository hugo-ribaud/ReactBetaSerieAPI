import Axios from "axios";

export const getListEpisode = async (idSerie) => {
    let token = localStorage.getItem("token");
    let apiUrl = `http://localhost:5000/series/episodes/${token}/${idSerie}`;

    let result = await Axios.get(apiUrl);
    return result.data;
};
