import React from 'react';

import { Alert, AlertTitle } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useStyles } from '../styles/Styles';

const NotLoggedIn = () => {

    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Alert severity="info" className={classes.smallAlert}>
                <AlertTitle>
                    <Typography variant="h6" color="primary" className={classes.headingText}>
                        Accès non autorisé
                    </Typography>
                </AlertTitle>
                <Typography variant="body1" color="primary" className={classes.text}>
                    Pour accéder à cette page, vous devez vous connecter en cliquant sur le lien ci-dessous.
                </Typography>
            </Alert>
            <Link href="/" className={classes.menuLink}>
                <Typography variant="body1" color="primary" className={classes.text}>
                    Se connecter
                </Typography>
            </Link>
        </Box>
    );
}

export default NotLoggedIn;