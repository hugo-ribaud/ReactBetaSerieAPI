import React, { useState } from 'react';
import Axios from 'axios';

import { useStyles } from '../styles/Styles';
import SearchResult from './SearchResult';

/**
 * Material-UI imports
 */
import Box from '@material-ui/core/Box';
import Textfield from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';

const SearchShow = () => {

    /**
     * Constants declarations
     */
    const [search, setSearch] = useState("");
    const [shows, setShows] = useState([]);
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(null);
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

        let title = '%'+search+'%';
        let apiUrl = `http://localhost:5000/series/search?title=${title}`
        
        await Axios({
            method: "get",
            url: apiUrl,
        })
        .then (response => {
            setSuccess(true);
            setShows(response.data.shows);
        })
        .catch(error => {
            setErrors(error.response.data);
        });
    }

    return (
        <Box className={classes.container}>
            <Typography variant="h6" color="primary" className={classes.headingText}>
                Rechercher une série
            </Typography>
            <form onSubmit={handleSubmit} className={classes.subContainer}>
                {
                    errors.map((error, index) => {
                        return <Alert key={index} severity="error">{error.text}</Alert>
                    })
                }
                <Textfield
                    variant="outlined"
                    fullWidth
                    color="primary"
                    className={classes.input}
                    value={search}
                    onChange={handleSearch}
                    type="text"
                    placeholder="Rechercher une série"
                />
                <Button type="submit" className={classes.bigButton}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        Rechercher
                    </Typography>
                </Button>
            </form>
            <Box>
                { success && (
                    <SearchResult shows={shows} />
                )}
            </Box>
        </Box>
    );
}

export default SearchShow;