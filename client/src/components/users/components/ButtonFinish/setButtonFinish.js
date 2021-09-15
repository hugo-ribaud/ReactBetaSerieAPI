import React from "react";
// import Axios from "axios";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import { episodeVu } from "../episodeVu";
import { episodeNonVu } from "../episodeNonVu";
// import { getListEpisode } from "../getListEpisodes";

const ButtonFinish = ({ setSortList, tableau, idEpisode, idSerie, getRefresh, setRefresh }) => {
    let obj = _.filter(tableau, { id: idEpisode });
    if (obj.length > 0) {
        if (obj[0].user.seen === true) {
            return (
                <Button
                    variant="contained"
                    onClick={async (e) => {
                        e.preventDefault();
                        episodeNonVu(idEpisode);
                        window.location.reload(false);
                    }}
                >
                    Vu
                </Button>
            );
        } else {
            return (
                <Button
                    variant="contained"
                    onClick={async (e) => {
                        e.preventDefault();
                        episodeVu(idEpisode);
                        window.location.reload(false);
                    }}
                >
                    Non vu
                </Button>
            );
        }
    }
};

export default ButtonFinish;
