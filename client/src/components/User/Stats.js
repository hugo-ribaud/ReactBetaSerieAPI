import React from 'react';

import { useStyles } from '../styles/Styles';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

const Stats = ({ stats }) => {

    const classes = useStyles();

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h6" color="primary" className={classes.headingText}>
                                Ses amis
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6" color="primary" className={classes.headingText}>
                                Ses séries
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6" color="primary" className={classes.headingText}>
                                Episodes vus
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6" color="primary" className={classes.headingText}>
                                Jour préféré
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Typography variant="body1" color="primary" className={classes.text}>
                                { stats.friends }
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1" color="primary" className={classes.text}>
                                { stats.shows }
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1" color="primary" className={classes.text}>
                                { stats.episodes }
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1" color="primary" className={classes.text}>
                                { stats.favorite_day }
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Stats;