import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useStyles } from "../styles/Styles";

/**
 * Material-UI imports
 */
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const SmallNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    let token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, [history]);

  return (
    <Box className={classes.navContainer}>
      <List className={classes.inlineList}>
        <ListItemIcon>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon color="primary" />
          </Button>
        </ListItemIcon>
        <ListItemText>
          <Typography
            variant="body1"
            color="primary"
            className={classes.headingText}
          >
            Menu
          </Typography>
        </ListItemText>
      </List>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link href="/">
            <Typography
              variant="body1"
              color="primary"
              className={classes.headingText}
            >
              Previously On
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/accueil">
            <Typography
              variant="body1"
              color="primary"
              className={classes.headingText}
            >
              Series
            </Typography>
          </Link>
        </MenuItem>
        {isLoggedIn && (
          <List>
            <MenuItem>
              <Link href="/" onClick={handleLogout}>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.headingText}
                >
                  Log out
                </Typography>
              </Link>
            </MenuItem>
            <List className={classes.overlined}>
              <MenuItem>
                <Link href="/serie" className={classes.menuLink}>
                  <Typography
                    variant="body1"
                    color="primary"
                    className={classes.text}
                  >
                    Mes séries
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/favoris" className={classes.menuLink}>
                  <Typography
                    variant="body1"
                    color="primary"
                    className={classes.text}
                  >
                    Mes favoris
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/amis" className={classes.menuLink}>
                  <Typography
                    variant="body1"
                    color="primary"
                    className={classes.text}
                  >
                    Mes amis
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/messagerie" className={classes.menuLink}>
                  <Typography
                    variant="body1"
                    color="primary"
                    className={classes.text}
                  >
                    Messagerie
                  </Typography>
                </Link>
              </MenuItem>
            </List>
          </List>
        )}
        {!isLoggedIn && (
          <MenuItem>
            <Link href="/">
              <Typography
                variant="body1"
                color="primary"
                className={classes.headingText}
              >
                Log in
              </Typography>
            </Link>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default SmallNavbar;
