import React from 'react';

import DiscoverGrid from './DiscoverGrid';
import SearchShow from './SearchShow';

/**
 * Material-UI imports
 */
import Grid from '@material-ui/core/Grid'

const DiscoverPage = () => {

    return (
        <Grid container justify="space-evenly">
            <Grid item lg={12} md={12} sm={12} xs={12} id="top">
                <SearchShow />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <DiscoverGrid />
            </Grid>
        </Grid>
    );
}

export default DiscoverPage;