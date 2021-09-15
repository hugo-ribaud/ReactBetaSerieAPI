import Axios from "axios";

export const getSerieDetail = async (idSerie) => {
    let apiUrl = `http://localhost:5000/series/infos/${idSerie}`;
    let result = await Axios.get(apiUrl);
    // console.log(result.data.show);
    return result.data.show;
};
