import Axios from "axios";

export const getSerieImage = async (idSerie) => {
    let apiUrl = `http://localhost:5000/series/infos/${idSerie}`;
    let result = await Axios.get(apiUrl);

    return result.data.show.images;
};
