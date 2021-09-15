import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { useStyles } from '../styles/Styles';

/**
 * Material-UI imports
 */
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import { CardMedia } from '@material-ui/core';

const News = () => {

    const [news, setNews] = useState([]);
    const [errors, setErrors] = useState([]);
    const classes = useStyles();

    const getnews = () => {
        let apiUrl = "http://localhost:5000/series/news";

        Axios({
            method: "get",
            url: apiUrl,
            data: {
                tailored: true
            }
        })
        .then (response => {
            setNews(response.data.news);
        })
        .catch(error => {
            setErrors(error.response);
        });
    }

    useEffect(() => {
        getnews();
    }, []);

    return (
        <Box className={classes.container}>
            { errors && (
                errors.map((error, index) => {
                    return <Alert key={index} severity="error" className={classes.smallAlert} id="top">
                        <Typography variant="body1" color="primary" className={classes.text}>
                            {error.text}
                        </Typography>
                    </Alert>
                })
            )}
            <Box className={classes.flexContainer}>
                {
                    news.map((item, index) => {
                        return <Card key={index} className={classes.card}>
                            <CardContent>
                                <CardMedia
                                    className={classes.cardImg}
                                    image={item.picture_url}
                                />
                                <Typography variant="body1" color="primary" className={classes.headingText}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body1" color="primary" className={classes.text}>
                                    publié le {item.date}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" className={classes.cardButton} target="_blank" href={item.url}>
                                    <Typography variant="body1" color="primary" className={classes.text}>
                                        Lire
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

export default News;