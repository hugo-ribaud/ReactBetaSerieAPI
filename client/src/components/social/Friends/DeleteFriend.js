import React, { useState } from 'react';
import Axios from 'axios';

import { useStyles } from '../../styles/Styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';

const DeleteFriend = ({ friend }) => {

    const [error, setError] = useState('');
    const classes = useStyles();

    const deleteFriend = id => {
        let token = localStorage.getItem('token');
        let ApiUrl = "http://localhost:5000/friend/delete";

        Axios({
            method: 'delete',
            url: ApiUrl,
            data: {
                id: id,
                token: token
            }
        })
        .then(() => {
            window.location.reload(false);
        })
        .catch(error => {
            setError(error.response.data);
        })
    }

    return (
        <Button onClick={() => deleteFriend(friend.id)} className={classes.cardButton}>
            { error && (
                <Alert severity="error" className={classes.smallAlert}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        {error}
                    </Typography>
                </Alert>
            )}
            <Typography variant="body1" color="primary" className={classes.text}>
                Supprimer
            </Typography>
        </Button>
    );
}

export default DeleteFriend;