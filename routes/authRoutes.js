const passport = require("passport");

// export the route handler middlerwares AS A FUNCTION, that gets mounted when invoked in /index.js
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  // TEST AUTHENTICATION
  app.get("/api/testauth", (req, res) => {
    if (!req.user) res.send("User not authenticated.");
    res.send(req.user);
  });

  //get current user
  app.get("/api/current_user", (req, res) => {
    console.log("API endpoit to get current user hit.... ", __filename);
    res.send(req.user); //returns null if no user signed in
  });

 

  //LOG OUT
  app.get("/api/logout", (req, res) => {
    req.logout();
    console.log("USER LOGGED OUT... ", __filename);
    // res.send("You are now logged out.");
    res.redirect("/");
  });
};
