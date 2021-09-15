import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginForm from "./components/auth/LoginForm";
import News from "./components/News/News";
import Profile from './components/User/Profile';
import FriendPage from "./components/social/Friends/FriendPage";
import FriendProfile from './components/social/Friends/FriendProfile';
import seriesLists from "./components/users/seriesLists";
import EpisodeList from "./components/users/episodeslist";
import Inbox from "./components/social/Messages/Inbox";
import Discussion from "./components/social/Messages/Discussion";
import NavbarFitsScreen from "./components/Navbar/NavbarFitsScreen";
import UnstaticFooter from "./components/Footer/UnstaticFooter";

import Grid from "@material-ui/core/Grid";
import DiscoverPage from "./components/series/DiscoverPage";
import PostMessage from "./components/social/Messages/PostMessage";
import FavoritesGrid from "./components/series/Favorites/FavoritesGrid";

const App = () => {
  return (
    <div>
      <Grid container justify="space-evenly">
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <NavbarFitsScreen />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Router>
            <Switch>
              <Route exact path="/" component={LoginForm} />
              <Route path="/accueil" component={DiscoverPage} />
              <Route path="/news" component={News} />
              <Route exact path="/profil" component={Profile} />
              <Route path="/amis" component={FriendPage} />
              <Route path="/profil/:id" component={FriendProfile} />
              <Route path="/messagerie" component={Inbox} />
              <Route path="/discussion/:id" component={Discussion} />
              <Route path="/message" component={PostMessage} />
              <Route exact path="/serie" component={seriesLists} />
              <Route path="/favoris" component={FavoritesGrid} />
              <Route path="/serie/:id" component={EpisodeList} />
            </Switch>
          </Router>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <UnstaticFooter />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
