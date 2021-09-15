import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { useStyles } from '../../styles/Styles';

/**
 * Material-UI imports
 */
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';

const BlockedList = () => {

    const [users, setUsers] = useState([]);
    const [emptyList, setEmptyList] = useState(null);
    const classes = useStyles();

    const getUsers = () => {
        let token = localStorage.getItem('token');
        let apiUrl = `http://localhost:5000/friend/blocked/${token}`;

        Axios({
            method: 'get',
            url: apiUrl
        })
        .then(response => {
            if (response.data.users.length < 1) {
                setEmptyList(true);
            } else {
                setUsers(response.data.users);
                setEmptyList(false);
            }
        });
    }

    const handleUnblock = id => {
        let apiUrl = "http://localhost:5000/friend/unblock";
        let token = localStorage.getItem('token');
        let userId = id;
        
        Axios({
            method: 'delete',
            url: apiUrl,
            data: {
                id: userId,
                token: token
            }
        })
        .then(() => {
            window.location.reload(false);
        });
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Box className={classes.container}>
            <Typography variant="h6" color="primary" className={classes.headingText}>
                Membres bloqués
            </Typography>
            { emptyList ? (
                <Alert severity="info" className={classes.smallAlert}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        Vous n'avez bloqué personne.
                    </Typography>
                </Alert>
            ) : (
                <Box className={classes.flexContainer}>
                    { users.map((user, index) => {
                        return <Card key={index} className={classes.extraSmallCard}>
                            <CardContent>
                                <Typography variant="h6" color="primary" className={classes.headingText}>
                                    {user.login}
                                </Typography>
                            </CardContent>
                            <CardActions className={classes.alignButton}>
                                <Button color="primary" size="small" className={classes.cardButton}>
                                    <Typography variant="body1" color="primary" onClick={() => handleUnblock(user.id)} className={classes.text}>
                                        Débloquer
                                    </Typography>
                                </Button>
                            </CardActions>
                        </Card>
                    })}
                </Box>
            )}
        </Box>
    );
}

export default BlockedList;