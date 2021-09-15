import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { useStyles } from '../../styles/Styles';
import Stats from '../../User/Stats';
import Popcorn from '../../../assets/icons/popcorn.png';

/**
 * Material-UI imports
 */
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Alert } from '@material-ui/lab';

const FriendProfile = ({ match }) => {

    const [infos, setInfos] = useState([]);
    const [stats, setStats] = useState([]);
    const [error, setError] = useState('');
    const classes = useStyles();


    useEffect(() => {
        let id = match.params.id;
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
        });
    }, [match.params.id]);

    return (
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
    );
}

export default FriendProfile;