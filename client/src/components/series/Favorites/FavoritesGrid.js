import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { useStyles } from '../../styles/Styles';
import { IsLoggedIn } from '../../auth/IsLoggedIn';
import NotLoggedIn from '../../auth/NotLoggedIn';

/**
 * Material-UI imports
 */
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';
import DeleteFromFavorites from './DeleteFromFavorites';

const FavoritesGrid = () => {

    const [shows, setShows] = useState([]);
    const [error, setError] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [isLoggedIn] = useState(IsLoggedIn());
    const classes = useStyles();

    const getFavoriteShows = () => {
        let id = localStorage.getItem('Id');
        let apiUrl = `http://localhost:5000/favorites/${id}`;

        Axios({
            method: 'get',
            url: apiUrl
        })
        .then(response => {
            if (response.data.shows.length < 1) setEmpty(true);
            setShows(response.data.shows);
        })
        .catch(error => {
            setError(true);
        });
    }

    useEffect(() => {
        getFavoriteShows();
    }, []);

    return isLoggedIn ? (
        <Box className={classes.container}>
            <Typography variant="body1" color="primary" className={classes.headingText}>
                Vos séries préférées
            </Typography>
            { error && (
                <Alert severity="error" className={classes.smallAlert}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        Il semblerait qu'une erreur se soit produite.
                    </Typography>
                </Alert>
            )}
            { empty && (
                <Alert severity="info" className={classes.smallAlert}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        Vous n'avez pas encore de favoris
                    </Typography>
                </Alert>
            )}
            <Box className={classes.flexContainer}>
                {
                    shows.map((show, index) => {
                        return <Card key={index} className={classes.card}>
                            <CardContent>
                                <CardMedia
                                    image={show.images.show}
                                    className={classes.cardImg}
                                />
                                <Typography variant="h6" color="primary" className={classes.headingText}>
                                    {show.title}
                                </Typography>
                            </CardContent>
                            <CardActions className={classes.justifyText}>
                                <DeleteFromFavorites show={show} />
                            </CardActions>
                        </Card>
                    })
                }
            </Box>
        </Box>
    ) : (
        <NotLoggedIn />
    );
}

export default FavoritesGrid;