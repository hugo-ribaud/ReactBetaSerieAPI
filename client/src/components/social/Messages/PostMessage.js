import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import { useStyles } from '../../styles/Styles'
import { IsLoggedIn } from '../../auth/IsLoggedIn';
import NotLoggedIn from '../../auth/NotLoggedIn';

/**
 * Material-UI imports
 */
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Alert } from '@material-ui/lab';

const PostMessage = () => {

    const [title, setTitle] = useState('');
    const [friends, setFriends] = useState([]);
    const [message, setMessage] = useState('');
    const [to, setTo] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn] = useState(IsLoggedIn());
    const history = useHistory();
    const classes = useStyles();

    const getFriends = () => {
        let token = localStorage.getItem('token');
        let ApiUrl = `http://localhost:5000/friend/list/${token}`;

        Axios.get(ApiUrl)
        .then(response => {
            setFriends(response.data.users);
        })
        .catch(error => {
            setError(error.response.data);
        })
    }

    useEffect(() => {
        getFriends();
    }, []);

    const handleTitle = event => {
        setTitle(event.target.value);
    }

    const handleMessage = event => {
        setMessage(event.target.value);
    }

    const handleFriend = event => {
        setTo(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();

        let apiUrl = "http://localhost:5000/messages/add";
        let token = localStorage.getItem('token');

        let data = {
            id: to,
            title: title,
            text: message,
            token: token
        }

        Axios({
            method: 'post',
            url: apiUrl,
            data: data
        })
        .then(response => {
            history.push("/messagerie");
        })
        .catch(error => {
            setError(error);
        });
    }

    return isLoggedIn ? (
        <Box className={classes.container}>
            { error && (
                <Alert severity="error" className={classes.smallAlert}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        {error}
                    </Typography>
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <List>
                    <ListItem>
                        <Typography variant="h6" color="primary" className={classes.headingText}>
                            Objet :
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <TextField
                            variant="outlined"
                            value={title}
                            onChange={handleTitle}
                            required
                            fullWidth
                            className={classes.input}
                            color="primary"
                            type="text"
                            placeholder="Titre de votre message"
                        />
                    </ListItem>
                </List>
                <List>
                    <ListItem>
                        <FormControl className={classes.input}>
                            <InputLabel id="friend">
                                <Typography varian="h6" color="primary" className={classes.headingText}>
                                    Envoyer à :
                                </Typography>
                            </InputLabel>
                            <Select
                                labelId="friend"
                                value={to}
                                onChange={handleFriend}
                                className={classes.select}
                            >
                                {
                                    friends.map((friend, index) => {
                                        return <MenuItem key={index} value={friend.id}>
                                            <Typography variant="body1" color="primary" className={classes.text}>
                                                {friend.login}
                                            </Typography>
                                        </MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </ListItem>
                </List>
                <List>
                    <ListItem>
                        <Typography variant="h6" color="primary" className={classes.headingText}>
                            Message :
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <TextField
                            variant="outlined"
                            value={message}
                            onChange={handleMessage}
                            required
                            fullWidth
                            className={classes.input}
                            color="primary"
                            type="text"
                            placeholder="Votre message"
                        />
                    </ListItem>
                </List>
                <Button color="primary" className={classes.bigButton} type="submit">
                    <Typography variant="body1" color="primary" className={classes.text}>
                        Envoyer
                    </Typography>
                </Button>
            </form>
        </Box>
    ) : (
        <NotLoggedIn />
    );
}

export default PostMessage;