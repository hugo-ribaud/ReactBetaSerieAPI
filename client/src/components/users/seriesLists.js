import React, { useEffect, useState } from "react";
import Axios from "axios";

import { useStyles } from "../styles/Styles";
import { IsLoggedIn } from '../auth/IsLoggedIn';
import NotLoggedIn from '../auth/NotLoggedIn';
import FavoriteShow from "../series/Favorites/subcomponents/FavoriteShow";
import StarIcon from '@material-ui/icons/Star';

/**
 * Material-UI imports
 */
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Alert } from '@material-ui/lab';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import Grid from '@material-ui/core/Grid';

const SeriesLists = () => {

    
    const [seriesLists, setSeriesLists] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(null);
    const [isLoggedIn] = useState(IsLoggedIn());
    const classes = useStyles();

    const getProducts = () => {
        let token = localStorage.getItem("token");

        let url = `http://localhost:5000/series/favorite/${token}`;
        Axios.get(url)
        .then((response) => {
            setSeriesLists(response.data.shows);
            setSuccess(true);
            // console.log(response.data);
        })
        .catch((error) => {
            // console.log(error.data);
            setError(error.response);
        });
    };

    useEffect(() => {
        getProducts();
    }, []);

    /**
     * 
     * Limits number of caracters in the description
     */
    const limitationCaractere = (text) => {
        if (text.length > 120) {
            let newText = text.substring(0, 120) + " ...";
            return newText;
        } else {
            return text;
        }
    };

    /**
     * 
     * Add the show to the archives thanks to its ID.
     */
    const addToArchive = (idSerie) => {
        Axios.post("http://localhost:5000/series/archive", { 
            id: idSerie, 
            token: localStorage.getItem("token") 
            }, {
            headers: {
                Authorization: localStorage.getItem("token"),
                "X-BetaSeries-Key": process.env.REACT_APP_API_KEY,
                "X-BetaSeries-Version": "3.0",
            },
        })
        .then(() => {
            getProducts();
        })
        .catch(error => {
            setError(error.response.data);
        })
    };

    /**
     * 
     * Get the show out of the archives.
     */
    const deleteToArchive = (idSerie) => {
        Axios({
            method: "delete",
            url: "http://localhost:5000/series/archive/delete",
            data: { id: idSerie, token: localStorage.getItem("token") },

            headers: {
                Authorization: localStorage.getItem("token"),
                "X-BetaSeries-Key": process.env.REACT_APP_API_KEY,
                "X-BetaSeries-Version": "3.0",
            },
        }).then(() => {
            getProducts();
        })
        .catch(error => {
            setError(error.response.data);
        });
    };

    /**
     * 
     * Button to archive and unarchive the show.
     * no page refresh.
     */
    const buttonArchiver = (value) => {
        if (value.user.archived === false) {
            return (
                <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                        addToArchive(value.id);
                    }}
                    className={classes.cardButton}
                >
                    <Typography variant="body1" color="primary" className={classes.text}>
                        Archiver
                    </Typography>
                </Button>
            );
        } else {
            return (
                <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                        deleteToArchive(value.id);
                    }}
                    className={classes.cardButton}
                >
                    <Typography variant="body1" color="primary" className={classes.text}>
                        Sortir des archives
                    </Typography>
                </Button>
            );
        }
    };

    return isLoggedIn ? (
        <Box className={classes.container}>
            <Typography variant="h6" color="primary" className={classes.headingText}>
                Vos séries
            </Typography>
            <Box className={classes.flexContainer}>
                { error && (
                    <Alert severity="error" className={classes.smallAlert}>
                        <Typography variant="body1" color="primary" className={classes.text}>
                            {error}
                        </Typography>
                    </Alert>
                )}
                { success && (
                    seriesLists.map((value, index) => {
                        return (
                            <Card key={index} className={classes.card}>
                                <CardContent>
                                    <Grid container justify="space-evenly">
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <CardMedia
                                                className={classes.cardImg}
                                                image={value.images.show}
                                            />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant="h6" color="primary" className={classes.headingText}>
                                                {value.title}
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.menuList}>
                                                {
                                                    Object.keys(value.genres).map((genre, i) => {
                                                        return <Typography key={i} variant="body2" color="primary" className={classes.marginText}>
                                                            {genre}
                                                        </Typography>
                                                    })
                                                }
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <List className={classes.menuList}>
                                                <ListItem>
                                                    <StarIcon color="primary" className={classes.icon}/>
                                                    <Typography variant="body1" color="primary" className={classes.text}>
                                                        {value.notes.mean.toFixed(0)} / 5 
                                                    </Typography>
                                                </ListItem>
                                            </List>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <Typography
                                                variant="body1"
                                                color="primary"
                                                className={classes.text}
                                            >
                                                {limitationCaractere(value.description)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions className={classes.alignButton}>
                                    { buttonArchiver(value) }
                                    <Button
                                        size="small"
                                        color="primary"
                                        href={`/serie/${value.id}`}
                                        className={classes.cardButton}
                                    >
                                        <Typography variant="body1" color="primary" className={classes.text}>
                                            Voir plus
                                        </Typography>
                                    </Button>
                                    <FavoriteShow value={value} />
                                </CardActions>
                            </Card>
                        );
                    })
                )}
            </Box>
        </Box>
    ) : (
        <NotLoggedIn />
    );
};

export default SeriesLists;
