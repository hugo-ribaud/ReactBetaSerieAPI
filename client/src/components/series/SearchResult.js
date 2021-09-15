import React, { useState } from 'react';
import Axios from 'axios';

import { useStyles } from '../styles/Styles';
import { IsLoggedIn } from '../auth/IsLoggedIn';

/**
 * Material-UI imports
 */
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';

const SearchResult = ({ shows }) => {

    /**
     * Constants declarations
     */
    const [success, setSucess] = useState(null);
    const [error, setError] = useState('');
    const [isLoggedIn] = useState(IsLoggedIn());
    const classes = useStyles();

    const limitationCaractere = (text) => {
        if (text.length > 75) {
            let newText = text.substring(0, 75) + " ...";
            return newText;
        } else {
            return text;
        }
    };

    /**
     * Adding a show to the user account
     */
    const handleClick = async () => {
        let showId;
        shows.map(show => {
            return showId = show.id;
        });

        let token = localStorage.getItem('token');
        let ApiUrl = "http://localhost:5000/series/add";
        let data = {
            id : showId,
            token: token
        }

        await Axios.post(ApiUrl, data)
        .then(response => {
            setSucess(true);
        })
        .catch(error => {
            setError(error.response.data);
        });
    }
    
    return (
        <Box>
            { error && (
                <Alert severity="error" className={classes.smallAlert}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        {error}
                    </Typography>
                </Alert>
            )}
            { success && (
                <Alert severity="success" className={classes.smallAlert}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        La série a été ajoutée !
                    </Typography>
                </Alert>
            )}
            <Typography variant="h6" color="primary" className={classes.headingText}>
                Résultats de votre recherche :
            </Typography>
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
                                <Typography variant="body1" color="primary" className={classes.text}>
                                    {show.creation} - {show.seasons} saisons
                                </Typography>
                                <Typography variant="body1" color="primary" className={classes.text}>
                                    {limitationCaractere(show.description)}
                                </Typography>
                            </CardContent>
                            { !success && (
                                <CardActions className={classes.alignButton}>
                                    <Button size="small" className={classes.cardButton} href={`/serie/${show.id}`}>
                                        <Typography variant="body1" color="primary" className={classes.text}>
                                            Voir plus
                                        </Typography>
                                    </Button>
                                    { isLoggedIn ? (
                                        <Button size="small" onClick={handleClick} className={classes.cardButton}>
                                            <Typography variant="body1" color="primary" className={classes.text}>
                                                Ajouter à vos séries
                                            </Typography>
                                        </Button>
                                    ) : (
                                        <></>
                                    )}
                                </CardActions>
                            )}
                        </Card>
                    })
                }
            </Box>
        </Box>
    );
}

export default SearchResult;