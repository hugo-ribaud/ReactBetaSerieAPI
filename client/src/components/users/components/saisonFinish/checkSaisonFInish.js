import React from "react";
import Button from "@material-ui/core/Button";
import { saisonFinished } from "./saisonFinished";
import { saisonUnFinished } from "./saisonUnfinished";
import Typography from "@material-ui/core/Typography";
// import _ from "lodash";

export const checkSaisonTerminer = (tableau, key, IdSerie) => {
    let saisonFinish = false;
    let test = tableau[key].length - 1;
    // const classes = useStyles();

    for (let index = 0; index <= test; index++) {
        const result = tableau[key][index].user.seen;
        if (result === false) {
            break;
        }
        if (index === test) {
            saisonFinish = true;
        }
    }
    if (saisonFinish === true) {
        return (
            <Button
                size="small"
                color="primary"
                onClick={(e) => {
                    e.stopPropagation();
                    saisonUnFinished(key, IdSerie);
                }}
            >
                <Typography variant="body1" color="primary">
                    Marquer comme non terminé
                </Typography>
            </Button>
        );
    } else {
        return (
            <Button
                size="small"
                color="primary"
                onClick={(e) => {
                    e.stopPropagation();
                    saisonFinished(key, IdSerie);
                }}
            >
                Marquer comme terminé
            </Button>
        );
    }
};
