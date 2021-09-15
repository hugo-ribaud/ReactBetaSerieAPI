import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { useStyles } from '../styles/Styles';

/**
 * Material-UI imports
 */
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';

const DiscoverGrid = () => {

    /**
     * Constants declarations
     */
    const [shows, setShows] = useState([]);
    const [error, setError] = useState('');
    const classes = useStyles();

    /**
     * Get 10 random shows to discover
     */
    const getShows = () => {
        let apiUrl = "http://localhost:5000/series/discover";

        Axios.get(apiUrl)
        .then(response => {
            setShows(response.data.shows);
        })
        .catch(error => {
            setError(error.response.data);
        })
    }

    const limitationCaractere = (text) => {
        if (text.length > 120) {
            let newText = text.substring(0, 120) + " ...";
            return newText;
        } else {
            return text;
        }
    };

    useEffect(() => {
        getShows();
    }, []);


    return (
        <Box className={classes.container}>
            <Typography variant="h6" color="primary" className={classes.headingText}>
                Les séries à decouvrir
            </Typography>
            { error && (
                <Alert severity="error" className={classes.smallAlert} id="top">
                    <Typography variant="body1" color="primary" className={classes.text}>
                        {error}
                    </Typography>
                </Alert>
            )}
            <Box className={classes.flexContainer}>
                {
                    shows.map((show, index) => {
                        return <Card key={index} className={classes.card}>
                        <CardContent>
                            <CardMedia
                                className={classes.cardImg}
                                image={show.images.show}
                            />
                            <Typography variant="h6" color="primary" className={classes.headingText}>
                                {show.title}
                            </Typography>
                            <Typography
                                variant="body1"
                                color="primary"
                                className={classes.text}
                            >
                                {limitationCaractere(show.description)}
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.alignButton}>
                            <Button
                                size="small"
                                color="primary"
                                href={`/serie/${show.id}`}
                                className={classes.cardButton}
                            >
                                <Typography variant="body1" color="primary" className={classes.text}>
                                    Voir plus
                                </Typography>
                            </Button>
                        </CardActions>
                    </Card>
                    })
                }
            </Box>
        </Box>
    );
}

export default DiscoverGrid;