import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Axios from "axios";

import { useStyles } from "../styles/Styles";

/**
 * Material-UI imports
 */
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Alert } from '@material-ui/lab';

const Login = () => {

    /**
     * Constants declarations
     */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const classes = useStyles();
    const history = useHistory();

    /**
     * 
     *  Set the email value 
     */
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    /**
     * 
     * Set the password value
     */
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    /**
     * 
     * Make a request to the server to check if user's infos are correct.
     * If everything is ok, user is redirected to the home page.
     * Else, error messages indicates what is wrong. 
     */
    const handleLogin = async (event) => {
        event.preventDefault();

        let ApiURL = "http://localhost:5000/login";
        let data = {
            email: email,
            password: password,
        };

        await Axios.post(ApiURL, data)
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('Login', response.data.user.login);
            localStorage.setItem('Id', response.data.user.id);
            history.push("/accueil");
        })
        .catch((error) => {
            setErrors(error.response.data);
        });
    };

    /**
     * When the user is logged in, a token exists in the local storage.
     * If this token exists, then the user is redirected to the home page 
     */
    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) history.push("/accueil");
    }, [history]);

    return (
        <Box className={classes.container}>
            <Typography variant="h6" color="primary" className={classes.headingText}>
                Se connecter
            </Typography>
            <Box className={classes.subContainer}>
                {
                    errors.map((error, index) => {
                        return <Alert className={classes.smallAlert} key={index} severity="error">
                            <Typography variant="h6" color="primary" className={classes.text}>
                                {error.text}
                            </Typography>
                        </Alert>
                    })
                }
            </Box>
            <form onSubmit={handleLogin} className={classes.subContainer}>
                <TextField
                    variant="outlined"
                    className={classes.input}
                    required
                    fullWidth
                    color="primary"
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="Adresse mail"
                />
                <TextField
                    variant="outlined"
                    className={classes.input}
                    required
                    fullWidth
                    color="primary"
                    type="password"
                    value={password}
                    onChange={handlePassword}
                    placeholder="Mot de passe"
                />
                <Button type="submit" fullWidth className={classes.bigButton}>
                    <Typography variant="body1" color="primary" className={classes.text}>Connexion</Typography>
                </Button>
            </form>
        </Box>
    );
};

export default Login;
