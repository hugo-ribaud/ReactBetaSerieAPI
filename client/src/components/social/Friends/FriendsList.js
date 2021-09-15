import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import { useStyles } from '../../styles/Styles';
import BlockFriend from './BlockFriend';
import DeleteFriend from './DeleteFriend';

/**
 * Material-UI imports
 */
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Alert } from '@material-ui/lab';

const FriendsList = () => {
    
    const [friends, setFriends] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const classes = useStyles();

    useEffect(() => {
        const getFriends = () => {

            let token = localStorage.getItem('token');
            let ApiUrl = `http://localhost:5000/friend/list/${token}`;

            Axios.get(ApiUrl)
            .then(response => {
                setSuccess('ok');
                setFriends(response.data.users);
            })
            .catch(error => {
                setError(error.response.data);
            })
        }

        getFriends();
    }, []);

    
    return (
        <Box className={classes.subContainer}>
            <Typography variant="h6" color="primary" className={classes.headingText}>
                Vos amis
            </Typography>
            { success && (
                <Box className={classes.flexContainer}>
                    <Box className={classes.flexContainer}>
                        {
                            friends.map((friend, index) => {
                                return <Card key={index} className={classes.extraSmallCard}>
                                    <CardContent>
                                        <Link  href={`/profil/${friend.id}`}>
                                            <Typography variant="h6" color="primary" className={classes.subheadingText}>
                                                {friend.login}
                                            </Typography>
                                        </Link>
                                        <Typography variant="h6" color="primary" className={classes.text}>
                                            {friend.xp} xp
                                        </Typography>
                                    </CardContent>
                                    <CardActions className={classes.alignButton}>
                                        <DeleteFriend friend={friend} />
                                        <BlockFriend friend={friend} />
                                    </CardActions>
                                </Card>
                            })
                        }
                    </Box>
                </Box>
            )}
            { error && (
                <Alert severity="error" className={classes.smallAlert}>
                    <Typography variant="body1" color="primary" className={classes.text}>
                        {error}
                    </Typography>
                </Alert>
            )}
        </Box>
    );
}

export default FriendsList;