import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { useStyles } from '../../styles/Styles';
import { IsLoggedIn } from '../../auth/IsLoggedIn';
import NotLoggedIn from '../../auth/NotLoggedIn';
import DeleteMessage from './subcomponents/DeleteMessage';
import ReadMessage from './subcomponents/ReadMessage';

/**
 * Metrial-UI imports
 */
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Alert } from '@material-ui/lab'

const Inbox = () => {

    const [discussions, setDiscussions] = useState([]);
    const [error, setError] = useState('');
    const [isLoggedIn] = useState(IsLoggedIn());
    const classes = useStyles();

    const getDiscussions = () => {
        let token = localStorage.getItem('token');
        let apiUrl = `http://localhost:5000/messages/inbox/${token}`;

        Axios({
            method: 'get',
            url: apiUrl,
        })
        .then(response => {
            setDiscussions(response.data.messages);
        })
        .catch(error => {
            setError(error.response.data);
        })
    }

    useEffect(() => {
        getDiscussions();
    }, []);


    return isLoggedIn ? (
        <Box className={classes.container}>
            <Typography variant="h6" color="primary" className={classes.headingText}>
                Votre boîte de réception
            </Typography>
            <Box className={classes.leftBox}>
                <Button color="primary" className={classes.cardButton} href="/message">
                    <Typography variant="body1" color="primary" className={classes.text}>
                        Nouveau message
                    </Typography>
                </Button>
            </Box>
            <Box className={classes.container}>
                { error && (
                    <Alert severity="danger" className={classes.smallAlert}>
                        <Typography variant="h6" color="primary" className={classes.text}>
                            {error}
                        </Typography>
                    </Alert>
                )}
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6" color="primary" className={classes.headingText}>
                                        Messages
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" color="primary" className={classes.text}>
                                        Envoyé par
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" color="primary" className={classes.text}>
                                        Envoyé à
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" color="primary" className={classes.text}>
                                        Date
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" color="primary" className={classes.text}>
                                        Supprimer
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                discussions.map((discussion, index) => {
                                    return <TableRow key={index}>
                                        <ReadMessage discussion={discussion} />
                                        <TableCell>
                                            <Typography variant="body1" color="primary" className={classes.text}>
                                                {discussion.sender.login}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1" color="primary" className={classes.text}>
                                                {discussion.recipient.login}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1" color="primary" className={classes.text}>
                                                {discussion.date}
                                            </Typography>
                                        </TableCell>
                                        <DeleteMessage discussion={discussion} />
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    ) : (
        <NotLoggedIn />
    );
}

export default Inbox;