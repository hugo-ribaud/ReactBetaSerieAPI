import React, { useState } from 'react';

import FriendsList from './FriendsList';
import SearchMembers from '../Members/SearchMembers';
import BlockedList from './BlockedList';
import NotLoggedIn from '../../auth/NotLoggedIn';
import { IsLoggedIn } from '../../auth/IsLoggedIn';

/**
 * Material-UI imports
 */
import Grid from '@material-ui/core/Grid'

const FriendPage = () => {

    const [isLoggedIn] = useState(IsLoggedIn());

    return (
        <Grid container justify="space-evenly">
            { isLoggedIn ? (
                <>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <FriendsList />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <SearchMembers />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <BlockedList />
                    </Grid>
                </>
            ) : (
                <NotLoggedIn />
            )}
        </Grid>
    );
}

export default FriendPage;