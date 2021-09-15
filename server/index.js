const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const app = express();
require("dotenv").config();

/**
 * Cross origins
 */
app.use(cors());

/**
 * Body parser
 */
app.use(
    bodyParser.json({
        limit: "16mb",
        extended: true,
    })
);
app.use(
    bodyParser.urlencoded({
        limit: "16mb",
        extended: true,
    })
);
const jsonParser = bodyParser.json();

console.log("serveur ok");

/**
 * Routes
 */

/**
 * Login
 */
app.use("/login", jsonParser, require("./routes/Login/login"));

/**
 * Messages
 */
app.use("/messages/inbox", jsonParser, require("./routes/Messages/inbox"));
app.use(
  "/messages/discussion",
  jsonParser,
  require("./routes/Messages/discussion")
);
app.use("/messages/add", jsonParser, require("./routes/Messages/addMessage"));
app.use(
  "/messages/delete",
  jsonParser,
  require("./routes/Messages/deleteMessage")
);
app.use("/messages/read", jsonParser, require("./routes/Messages/readMessage"));

/**
 * Series / Favorites
 */
app.use("/favorites", jsonParser, require("./routes/Series/Favorites/favoritesAll"));
app.use("/favorites/add", jsonParser, require("./routes/Series/Favorites/addtoFavorites"));
app.use("/favorites/delete", jsonParser, require("./routes/Series/Favorites/deleteFromFavorites"));

/**
 * Series / Shows / Archives
 */
app.use("/series/archive", jsonParser, require("./routes/Series/Shows/Archives/addToArchive"));
app.use(
  "/series/archive/delete",
  jsonParser,
  require("./routes/Series/Shows/Archives/deleteToArchive")
);

/**
 * Series / Shows / CRUD 
 */
app.use("/series/add", jsonParser, require("./routes/Series/Shows/CRUD/addToAccount"));
app.use(
  "/series/delete",
  jsonParser,
  require("./routes/Series/Shows/CRUD/deleteFromAccount")
);

/**
 * Series / Shows
 */
app.use("/series/discover", jsonParser, require("./routes/Series/Shows/discover"));
app.use("/series/news", jsonParser, require("./routes/Series/Shows/news"));
app.use("/series/search", jsonParser, require("./routes/Series/Shows/search"));

/**
 * Social / Friends
 */
app.use("/friend", jsonParser, require("./routes/Social/addFriend"));
app.use("/friend/list", jsonParser, require("./routes/Social/friendsList"));
app.use("/friend/delete", jsonParser, require("./routes/Social/deleteFriend"));
app.use("/friend/block", jsonParser, require("./routes/Social/blockFriend"));
app.use("/friend/unblock", jsonParser, require("./routes/Social/unblockFriend"));
app.use("/friend/blocked", jsonParser, require("./routes/Social/blockedList"));
app.use("/friend/requests", jsonParser, require("./routes/Social/friendRequests"));

/**
 * User
 */
app.use("/user", jsonParser, require("./routes/User/info"));



/**
 *  A trier !
 */
app.use("/series/favorite", jsonParser, require("./routes/Series/favorite"));

app.use("/series/infos", jsonParser, require("./routes/Series/detailSerie.js"));

app.use(
  "/series/episodes",
  jsonParser,
  require("./routes/Series/episodeList.js")
);
app.use(
  "/series/episodes/finish",
  jsonParser,
  require("./routes/Series/addEpisodeToFinish.js")
);
app.use(
  "/series/episodes/unfinish",
  jsonParser,
  require("./routes/Series/deleteEpisodeToFinish.js")
);
app.use(
  "/series/saison/finish",
  jsonParser,
  require("./routes/Series/addSeasonToFinish.js")
);
app.use(
  "/series/saison/unfinish",
  jsonParser,
  require("./routes/Series/deleteSeasonToFinish.js")
);



/**
 * Port
 */
app.listen(5000);
