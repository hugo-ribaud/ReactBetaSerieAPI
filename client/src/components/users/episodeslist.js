import React, { useEffect, useState } from "react";
import { getSerieDetail } from "./components/getSerieDetail";
import { getSerieImage } from "./components/getSerieImages";
import { getListEpisode } from "./components/getListEpisodes";
import ButtonFinish from "./components/ButtonFinish/setButtonFinish";
import { checkSaisonTerminer } from "./components/saisonFinish/checkSaisonFInish";
import { useStyles } from "../styles/Styles";
import _ from "lodash";

import NotLoggedIn from "../auth/NotLoggedIn";
import { IsLoggedIn } from '../auth/IsLoggedIn';

/**
 * Material - UI imports
 */
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";

const useStylesBackdrop = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0,0,0,0.05)",
    },
    interieur: {
        width: "50%",
        height: "90%",
        backgroundColor: "grey",
    },
}));

const EpisodeList = ({ match }) => {

    const [isLoggedIn] = useState(IsLoggedIn());
    const idSerie = match.params.id;
    const [episodes, setepisodes] = useState([]);
    const [image, setImage] = useState({});
    const [list] = useState([]);
    const [sortList, setSortList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [infoBackdrop, setinfoBackdrop] = useState([]);
    const [open, setOpen] = React.useState(false);
    const classesBackdrop = useStylesBackdrop();
    const classes = useStyles();
    
    useEffect(() => {
        async function fetchMyAPI() {
            setSortList(await getListEpisode(idSerie));
            setImage(await getSerieImage(idSerie));
            setepisodes(await getSerieDetail(idSerie));
        }
        fetchMyAPI();
    }, [idSerie]);

    //5. Set the backdrop containing details of the episode

    const handleToggle = (tableau, idEpisode) => {
        let obj = _.filter(tableau, { id: idEpisode });
        obj.map((value) => {
            return setinfoBackdrop(value);
        });
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box className={classes.container}>
            {!isLoggedIn ? (
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <NotLoggedIn />
                </Grid>
            ) : (
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box className={classes.container}>
                        <Card className={classes.bigCard}>
                            <CardContent>
                                <img
                                    src={image.banner}
                                    alt="Episode"
                                    className={classes.bigCardImg}
                                />
                                <Typography
                                    variant="h6"
                                    color="primary"
                                    className={classes.headingText}
                                >
                                    {episodes.title}
                                </Typography>
                                <Typography variant="body1" className={classes.text}>
                                    {episodes.seasons} saisons
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="primary"
                                    className={classes.text}
                                >
                                    {episodes.episodes} episodes
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="primary"
                                    className={classes.text}
                                >
                                    {episodes.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    {/* separation */}
                    <Box className={classes.container}>
                        {sortList.map((value, index) => {
                            return (
                                <Accordion key={index} className={classes.accordion}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <div className={classes.saisonFini}>
                                            <Typography
                                                variant="h6"
                                                color="primary"
                                                className={classes.headingText}
                                            >
                                                Saison {index + 1}
                                            </Typography>
                                            {checkSaisonTerminer(sortList, index, idSerie)}
                                        </div>
                                    </AccordionSummary>
                                    {value.map((val, ind) => {
                                        return (
                                            <AccordionDetails key={ind}>
                                                <AccordionSummary>
                                                    <Box className={classes.flexContainer}>
                                                        <Card className={classes.extraSmallCard}>
                                                            <CardContent>
                                                                <Box
                                                                    className={
                                                                        classes.flexContainer
                                                                    }
                                                                    onClick={() => {
                                                                        handleToggle(list, val.id);
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="body1"
                                                                        color="primary"
                                                                        className={classes.text}
                                                                    >
                                                                        Episode {val.code}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                            <CardActions>
                                                                <Button
                                                                    variant="contained"
                                                                    onClick={() => {
                                                                        handleToggle(
                                                                            sortList[index],
                                                                            val.id
                                                                        );
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="body1"
                                                                        color="primary"
                                                                        className={classes.text}
                                                                    >
                                                                        Voir plus
                                                                    </Typography>
                                                                </Button>
                                                                <ButtonFinish
                                                                    setSortList={setSortList}
                                                                    tableau={sortList[index]}
                                                                    idEpisode={val.id}
                                                                    idSerie={idSerie}
                                                                    getRefresh={refresh}
                                                                    setRefresh={setRefresh}
                                                                />
                                                                <Backdrop
                                                                    className={
                                                                        classesBackdrop.backdrop
                                                                    }
                                                                    open={open}
                                                                    onClick={handleClose}
                                                                >
                                                                    <Card
                                                                        className={
                                                                            classesBackdrop.interieur
                                                                        }
                                                                    >
                                                                        <CardContent>
                                                                            <img
                                                                                src={image.banner}
                                                                                alt="Episode"
                                                                                className={
                                                                                    classes.bigCardImg
                                                                                }
                                                                            />
                                                                            <Typography variant="body1">
                                                                                {infoBackdrop.title}
                                                                            </Typography>
                                                                            <Typography variant="body1">
                                                                                Premiere diffusion :{" "}
                                                                                {infoBackdrop.date}
                                                                            </Typography>
                                                                            <Typography variant="body1">
                                                                                {
                                                                                    infoBackdrop.description
                                                                                }
                                                                            </Typography>
                                                                        </CardContent>
                                                                    </Card>
                                                                </Backdrop>
                                                            </CardActions>
                                                        </Card>
                                                    </Box>
                                                </AccordionSummary>
                                            </AccordionDetails>
                                        );
                                    })}
                                </Accordion>
                            );
                        })}
                    </Box>
                </Grid>
            )}
        </Box>
    );
};

export default EpisodeList;
