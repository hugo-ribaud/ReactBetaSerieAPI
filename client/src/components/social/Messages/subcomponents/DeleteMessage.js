import React, { useState } from 'react';
import Axios from 'axios';

import { useStyles } from '../../../styles/Styles';

/**
 * Material-UI imports
 */
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';

const DeleteMessage = ({ discussion }) => {

    const [error, setError] = useState('');
    const classes = useStyles();

    const deleteMessage = id => {
        let token = localStorage.getItem('token');
        let apiUrl = `http://localhost:5000/messages/delete/${token}/${id}`;

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
        <TableCell>
            { error && (
                <Alert severity="error" className={classes.smallAlert}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        {error}
                    </Typography>
                </Alert>
            )}
            { String(discussion.sender.id) === String(localStorage.getItem('Id')) && (
                <DeleteIcon onClick={() => {deleteMessage(discussion.message_id)}} color="primary" />
            )}
        </TableCell>
    );
}

export default DeleteMessage;