import React, { useState } from 'react';

import { IsLoggedIn } from '../auth/IsLoggedIn';
import Infos from './Infos';
import NotLoggedIn from '../auth/NotLoggedIn';

/**
 * Material-Ui imports
 */
import Grid from '@material-ui/core/Grid';

const Profile = () => {
    
    const [isLoggedIn] = useState(IsLoggedIn());

    return (
        <Grid container justify="space-evenly">
            { isLoggedIn ? (
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Infos />
                </Grid>
                ) : (
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <NotLoggedIn />
                    </Grid>
                )
            }
        </Grid>
    );
}

export default Profile;