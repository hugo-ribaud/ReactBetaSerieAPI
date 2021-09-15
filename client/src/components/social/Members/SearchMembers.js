import React, { useState } from 'react';
import Axios from 'axios';

import { useStyles } from '../../styles/Styles';
import { IsLoggedIn } from '../../auth/IsLoggedIn';
import NotLoggedIn from '../../auth/NotLoggedIn';
import MembersResult from './MembersResult';

/**
 * Material-UI imports
 */
import Box from '@material-ui/core/Box';
import Textfield from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';

const SearchMembers = () => {

    /**
     * Constants declarations
     */
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoggedIn] = useState(IsLoggedIn());
    const classes = useStyles();

    const handleSearch = event => {
        setSearch(event.target.value);
    }

    /**
     * Get all the registered members corresponding to the
     * research made.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        let research = '%'+search+'%';
        let key = process.env.REACT_APP_API_KEY
        let ApiURL = `https://api.betaseries.com/members/search?login=${research}`
        
        await Axios.get(ApiURL, {
            headers: {
                "Authorization": localStorage.getItem("token"),
                "X-BetaSeries-Key": key,
                "X-BetaSeries-Version": "3.0",
            }
        })
        .then(response => {
            setUsers(response.data.users);
            setSuccess('ok');
        })
        .catch(error => {
            setError(error.response.data);
        })
    }

    return isLoggedIn ? (
        <Box className={classes.container}>
            <Typography variant="h6" color="primary" className={classes.headingText}>
                Rechercher un membre
            </Typography>
            <form onSubmit={handleSubmit} className={classes.subContainer}>
                { error && (
                    <Alert severity="error" className={classes.smallAlert}>
                        <Typography variant="body1" color="primary" className={classes.text}>
                            {error}
                        </Typography>
                    </Alert>
                
                )}
                <Textfield
                    variant="outlined"
                    fullWidth
                    color="primary"
                    className={classes.input}
                    value={search}
                    onChange={handleSearch}
                    type="text"
                    placeholder="Rechercher un membre"
                />
                <Button type="submit" className={classes.bigButton}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        Rechercher
                    </Typography>
                </Button>
            </form>
            <Box className={classes.container}>
                { success && (
                    <MembersResult users={users} />
                )}
            </Box>
        </Box>
    ) : (
        <NotLoggedIn />
    );
}

export default SearchMembers;