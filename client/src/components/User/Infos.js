import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { IsLoggedIn } from '../auth/IsLoggedIn';
import NotLoggedIn from '../auth/NotLoggedIn';
import { useStyles } from '../styles/Styles';
import Popcorn from '../../assets/icons/popcorn.png';
import Stats from './Stats';

/**
 * Material - UI imports
 */
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Alert } from '@material-ui/lab';

const Infos = () => {

    const [infos, setInfos] = useState([]);
    const [stats, setStats] = useState([]);
    const [error, setError] = useState('');
    const [isLoggedIn] = useState(IsLoggedIn());
    const classes = useStyles();

    const getUserInfos = () => {
        let id = localStorage.getItem('Id');
        let apiUrl = `http://localhost:5000/user/${id}`;

        Axios({
            method: 'get',
            url: apiUrl
        })
        .then(response => {
            setInfos(response.data.member);
            setStats(response.data.member.stats);
        })
        .catch(error => {
            setError(error.response);
        })
    }

    useEffect(() => {
        getUserInfos();
    }, []);

    return isLoggedIn ? (
        <Box className={classes.container}>
            { error && (
                <Alert severity="error" className={classes.smallAlert}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        {error}
                    </Typography>
                </Alert>
            )}
            <Card className={classes.smallCard}>
                <CardContent>
                    <CardMedia image={infos.avatar || Popcorn} className={classes.cardAvatar} />
                    <Typography variant="h6" color="primary" className={classes.headingText}>
                        {infos.login}
                    </Typography>
                    <Typography variant="h6" color="primary" className={classes.headingText}>
                        {infos.xp} xp
                    </Typography>
                    <Stats stats={stats} />
                </CardContent>
            </Card>
        </Box>
    ) : (
        <NotLoggedIn />
    );
}

export default Infos;