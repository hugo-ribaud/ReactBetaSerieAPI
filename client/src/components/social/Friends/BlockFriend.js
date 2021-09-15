import React, { useState } from 'react';
import Axios from 'axios';

import { useStyles } from '../../styles/Styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
 
const BlockFriend = ({ friend }) => {

    const [error, setError] = useState('');
    const classes = useStyles();

    const blockFriend = id => {
        let token = localStorage.getItem('token');
        let ApiUrl = "http://localhost:5000/friend/block";

        Axios({
            method: 'post',
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
        <Button onClick={() => blockFriend(friend.id)} className={classes.cardButton}>
            { error && (
                <Alert severity="error" className={classes.smallAlert}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        {error}
                    </Typography>
                </Alert>
            )}
            <Typography variant="body1" color="primary" className={classes.text}>
                Bloquer
            </Typography>
        </Button>
    );
}

export default BlockFriend;