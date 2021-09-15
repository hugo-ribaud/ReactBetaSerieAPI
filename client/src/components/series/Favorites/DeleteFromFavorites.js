import React, { useState } from 'react';
import Axios from 'axios';

import { useStyles } from '../../styles/Styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';

const DeleteFromFavorites = ({ show }) => {
    
    const [error, setError] = useState('');
    const classes = useStyles();

    const deleteShow = id => {
        let token = localStorage.getItem('token');
        let apiUrl = `http://localhost:5000/favorites/delete/${token}/${id}`;

        Axios({
            method: 'delete',
            url: apiUrl,
        })
        .then(() => {
            window.location.reload(false);
        })
        .catch(error => {
            setError(error.response.data);
        });
    }

    return (
        <Button onClick={() => {deleteShow(show.id)}} color="primary" className={classes.cardButton}>
            { error && (
                <Alert severity="error" className={classes.smallAlert}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        {error}
                    </Typography>
                </Alert>
            )}
            <Typography variant="body1" color="primary" className={classes.text}>
                Supprimer des favoris
            </Typography>
        </Button>
    );
}

export default DeleteFromFavorites;