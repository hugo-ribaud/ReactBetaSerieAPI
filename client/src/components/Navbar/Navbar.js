import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useStyles } from "../styles/Styles";
import Popcorn from "../../assets/icons/popcorn.png";
import Menu from "../Menu/Menu";

/**
 * Material-UI imports
 */
import TheatersIcon from "@material-ui/icons/Theaters";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const history = useHistory();
  const classes = useStyles();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Login");
    localStorage.removeItem("Id");
  };

  /**
   * When the user is logged in, a token exists in the local storage.
   * If this token exists, then the user is redirected to the home page
   */
  useEffect(() => {
    // window.onscroll = () => { scrollHeader(); }
    // const header = document.getElementById("header");
    // const sticky = header.offsetTop;
    // const scrollHeader = () => {
    //     if (window.pageYOffset > sticky) header.classList.add(classes.sticky);
    //     else header.classList.remove(classes.sticky);
    // }
    let token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, [history, classes.sticky]);

  return (
    <Grid
      container
      justify="space-evenly"
      className={classes.navContainer}
      id="header"
    >
      <Grid item lg={3} md={4} sm={3} xs={3}>
        <List className={classes.inlineList}>
          <ListItem>
            <img src={Popcorn} className={classes.icon} alt="Popcorn icon" />
            <Link href="/accueil">
              <Typography
                variant="h6"
                color="primary"
                className={classes.headingText}
              >
                Previously On
              </Typography>
            </Link>
          </ListItem>
        </List>
      </Grid>
      <Grid item lg={2} md={2} sm={3} xs={3}>
        <List className={classes.inlineList}>
          <ListItemIcon>
            <TheatersIcon color="primary" />
          </ListItemIcon>
          <ListItemText>
            <Link href="/accueil">
              <Typography
                variant="h6"
                color="primary"
                className={classes.headingText}
              >
                Séries
              </Typography>
            </Link>
          </ListItemText>
        </List>
      </Grid>
      <Grid item lg={2} md={2} sm={3} xs={3}>
        <List className={classes.inlineList}>
          <ListItemIcon>
            <LibraryBooksIcon color="primary" />
          </ListItemIcon>
          <ListItemText>
            <Link href="/news">
              <Typography
                variant="h6"
                color="primary"
                className={classes.headingText}
              >
                News
              </Typography>
            </Link>
          </ListItemText>
        </List>
      </Grid>
      {isLoggedIn && (
        <Grid item lg={2} md={2} sm={2} xs={2}>
          <List className={classes.inlineList}>
            <ListItemIcon>
              <ExitToAppIcon color="primary" />
            </ListItemIcon>
            <ListItemText>
              <Link href="/" onClick={handleLogout}>
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.headingText}
                >
                  Log out
                </Typography>
              </Link>
            </ListItemText>
          </List>
        </Grid>
      )}
      {!isLoggedIn && (
        <Grid item lg={2} md={2} sm={2} xs={2}>
          <List className={classes.inlineList}>
            <ListItemIcon>
              <ExitToAppIcon color="primary" />
            </ListItemIcon>
            <ListItemText>
              <Link href="/">
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.headingText}
                >
                  Log in
                </Typography>
              </Link>
            </ListItemText>
          </List>
        </Grid>
      )}
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Menu />
      </Grid>
    </Grid>
  );
};

export default Navbar;
