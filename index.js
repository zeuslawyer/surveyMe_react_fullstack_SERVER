const express = require("express");
const CONFIG = require("./config/secrets.js");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const path = require("path");

//WIRE UP MONGOOSE
require("./models/User.js");
mongoose.connect(CONFIG.mongoURI);

//load the passport config
require("./services/passportConfig.js");

//SET UP SERVER
const app = express();
const PORT = process.env.PORT || 5000;

// configure express app to use cookies with passport..
cookieSessionConfig = {
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
  keys: [CONFIG.cookieKey]
};
app.use(bodyParser.json());
app.use(cookieSession(cookieSessionConfig));
app.use(passport.initialize());
app.use(passport.session());

/*
Mount the routes    - by loading the 
exported routing middleware functions 
AND immediately invoking them....
NOTE:  root '/' path not needed as 
1) app.js has Router set up to send / routes to Landing component
2)we've added catchall "*"
route handler below to serve static file"
*/

// require("./routes/index.js")(app);

require("./routes/authRoutes.js")(app);
require("./routes/billingRoutes.js")(app);

/* CONFIGURE THE SERVER TO SERVE REACT APP ROUTING WHERE 
SERVER ROUTES ARE NOT MATCHED  --  ONLY in PROD ,as in dev, there are two
servers running on local machine (3000 and 5000)
*/

if (process.env.NODE_ENV === "production") {
  //direct express to use static folder
  app.use(express.static("client/build"));

  //wildcard route handler redirects all unrecognised routes to react index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
