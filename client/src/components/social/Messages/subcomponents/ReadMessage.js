import React, { useState } from 'react';
import Axios from 'axios';

import { useStyles } from '../../../styles/Styles';

/**
 * Material-UI imports
 */
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import TableCell from '@material-ui/core/TableCell';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';


const ReadMessage = ({ discussion }) => {

    const [error, setError] = useState('');
    const classes = useStyles();

    const charLimit = (text) => {
        let croppedText = text.substring(0, 30) + " ...";
        if (text.length > 30) return croppedText; 
        else return text;
    }

    const readMessage = id => {
        let apiUrl = "http://localhost:5000/messages/read";
        let token = localStorage.getItem('token');

        Axios({
            method: 'post',
            url: apiUrl,
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
        });
    }

    return (
        <TableCell>
            { error && (
                <Alert severity="error" className={classes.smallAlert}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        {error}
                    </Typography>
                </Alert>
            )}
            { discussion.has_unread === Boolean(true) ? (
                <NotificationsActiveIcon color="primary" />
            ) : (
                <NotificationsNoneIcon color="primary" />
            )}
            <Link  href={`/discussion/${discussion.id}`} onClick={() => {readMessage(discussion.id)}}>
                <Typography variant="h6" color="primary" className={classes.headingText}>
                    {discussion.title}
                </Typography>
            </Link>
            <Typography variant="body1" color="primary" className={classes.text}>
                { charLimit(discussion.text) }
            </Typography>
        </TableCell>
    );
}

export default ReadMessage;