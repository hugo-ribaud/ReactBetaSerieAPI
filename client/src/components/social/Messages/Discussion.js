import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { useStyles } from '../../styles/Styles';
import { IsLoggedIn } from '../../auth/IsLoggedIn';
import NotLoggedin from '../../auth/NotLoggedIn';

/**
 * Material-UI imports
 */
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';

const Discussion = ({ match }) => {
    
    const [discussion, setDiscussion] = useState([]);
    const [error, setError] = useState('');
    const [isLoggedIn] = useState(IsLoggedIn());
    const classes = useStyles();

    useEffect(() => {
        let id = match.params.id;
        let token = localStorage.getItem('token');
        let apiUrl = `http://localhost:5000/messages/discussion/${token}/${id}`;

        Axios({
            method: 'get',
            url: apiUrl,
        })
        .then(response => {
            setDiscussion(response.data.messages);
        })
        .catch(error => {
            setError(error.response.data);
        });
    }, [match.params.id]);

    return isLoggedIn ? (
        <Box className={classes.container}>
            { error && (
                <Alert severity="error" className={classes.smallAlert}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        {error}
                    </Typography>
                </Alert>
            )}
            {
                discussion.map((message, index) => {
                    return <Box key={index}>
                        <Typography variant="h6" className={classes.headingText}>
                            Message de {message.sender.login} à {message.recipient.login} :
                        </Typography>
                        <Paper elevation={3} className={classes.paper}>
                            <Typography variant="h6" color="primary" className={classes.headingText}>
                                Objet :
                            </Typography>
                            <Typography variant="body1" color="primary" className={classes.paperText}>
                                {message.title}
                            </Typography>
                            <Typography variant="h6" color="primary" className={classes.headingText}>
                                Message :
                            </Typography>
                            <Typography variant="body1" color="primary" className={classes.paperText}>
                                {message.text}
                            </Typography>
                        </Paper>
                        <Typography variant="body2" color="primary" className={classes.text}>
                            {message.date}
                        </Typography>
                    </Box>
                }) 
            }
        </Box>
    ) : (
        <NotLoggedin />
    );
}

export default Discussion;