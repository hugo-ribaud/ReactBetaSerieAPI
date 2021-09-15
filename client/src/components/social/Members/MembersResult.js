import React, { useState } from 'react';
import Axios from 'axios';

import { useStyles } from '../../styles/Styles';

/**
 * Material-UI imports
 */
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';

const MembersResult = ({ users }) => {

    /**
     * Constants declarations
     */
    const [success, setSucess] = useState(null);
    const [error, setError] = useState('');
    const classes = useStyles();

    /**
     * Adding a friend by passing the target ID to post request.
     * Mapping the result data array to get that ID 
     */
    const handleClick = async () => {
        let userId;
        users.map(user => {
            return userId = user.id;
        });

        let token = localStorage.getItem('token');
        let ApiUrl = "http://localhost:5000/friend";
        let data = {
            id : userId,
            token: token
        }

        await Axios.post(ApiUrl, data)
        .then(response => {
            setSucess(true);
            window.location.reload(false);
        })
        .catch(error => {
            setError(error.response.data);
        });
    }
    
    return (
        <Box className={classes.flexContainer}>
            { error && (
                <Alert severity="error" className={classes.smallAlert}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        {error}
                    </Typography>
                </Alert>
            )}
            { success && (
                <Alert severity="info" className={classes.smallAlert}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        Votre demande d'ami a été envoyée !
                    </Typography>
                </Alert>
            )}
            {
                users.map((user, index) => {
                    return <Card key={index} className={classes.extraSmallCard}>
                        <CardContent>
                            <Typography variant="h6" color="primary" className={classes.headingText}>
                                {user.login}
                            </Typography>
                            <Typography variant="body1" color="primary" className={classes.text}>
                                {user.xp} xp
                            </Typography>
                        </CardContent>
                        { !success && (
                            <CardActions className={classes.alignButton}>
                                <Button size="small" onClick={handleClick} className={classes.cardButton}>
                                    <Typography variant="body1" color="primary" className={classes.text}>
                                        Ajouter en ami
                                    </Typography>
                                </Button>
                            </CardActions>
                        )}
                    </Card>
                })
            }
        </Box>
    );
}

export default MembersResult;