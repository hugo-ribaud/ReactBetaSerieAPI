import React, { useState, useEffect } from "react";

import { useStyles } from "../styles/Styles";
import { IsLoggedIn } from "../auth/IsLoggedIn";

/**
 * Material-UI imports
 */
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const Menu = () => {
  const [login, setLogin] = useState("");
  const [isLoggedIn] = useState(IsLoggedIn());
  const classes = useStyles();

  const getUserLogin = () => {
    let userLogin = localStorage.getItem("Login");
    if (userLogin) {
      setLogin(userLogin);
    } else {
      setLogin(null);
    }
  };

  useEffect(() => {
    getUserLogin();
  }, []);

  return (
    <Grid container justify="space-evenly">
      {isLoggedIn ? (
        <Grid container justify="space-evenly" className={classes.justifyText}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container justify="space-around" className={classes.menuList}>
              <Grid
                item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                className={classes.justifyText}
              >
                <Link href="/profil" className={classes.menuLink}>
                  <Typography
                    variant="body1"
                    color="primary"
                    className={classes.text}
                  >
                    Hello {login} !
                  </Typography>
                </Link>
              </Grid>
              <Grid item lg={2} md={2} sm={2} xs={2}>
                <Link href="/serie" className={classes.menuLink}>
                  <Typography
                    variant="body1"
                    color="primary"
                    className={classes.text}
                  >
                    Mes séries
                  </Typography>
                </Link>
              </Grid>
              <Grid item lg={2} md={2} sm={2} xs={2}>
                <Link href="/favoris" className={classes.menuLink}>
                  <Typography
                    variant="body1"
                    color="primary"
                    className={classes.text}
                  >
                    Mes favoris
                  </Typography>
                </Link>
              </Grid>
              <Grid item lg={2} md={2} sm={2} xs={2}>
                <Link href="/amis" className={classes.menuLink}>
                  <Typography
                    variant="body1"
                    color="primary"
                    className={classes.text}
                  >
                    Mes amis
                  </Typography>
                </Link>
              </Grid>
              <Grid item lg={2} md={2} sm={2} xs={2}>
                <Link href="/messagerie" className={classes.menuLink}>
                  <Typography
                    variant="body1"
                    color="primary"
                    className={classes.text}
                  >
                    Messagerie
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid item lg={12} md={12} sm={12} xs={12} />
      )}
    </Grid>
  );
};

export default Menu;
