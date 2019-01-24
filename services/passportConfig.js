const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const CONFIG = require("../config/secrets.js");
const mongoose = require("mongoose");

//retrieve the User Class/ Model from mongoose, so the GoogleStrategy can read/write to the User collection
const User = mongoose.model("users");

//serialise user for creating ID token for user in-browser
passport.serializeUser((user, done) => {
  //user here is the mongo record , not the Google profile. user ID is encoded
  done(null, user.id);
});

// deserialise user -> decodes the browser token for the user to check if user is properly authenticated
passport.deserializeUser((id, done) => {
  User.findById(id).then(userRecord => done(null, userRecord));
});

//set up Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: CONFIG.googleClientID,
      clientSecret: CONFIG.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    successCallback
  )
);

//callback that gets invoked when Passport successfully retrieves users credentials from Google
async function successCallback(accessToken, refreshToken, profile, done) {
  //if the user does not exist in DB...
  const existingUser = await User.findOne({ googleID: profile.id });
  if (!existingUser) {
    const user = await new User({
      googleID: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value
    }).save();
    console.log("New user. Saved to DB....at... ", __filename);
    return done(null, user);
  }

  //if  user exists in DB
  console.log("User already exists - not saving to DB. GoogleID: ", profile.id);
  console.log(" at filename... ", __filename);
  done(null, existingUser);
}
// .catch(err => {
//   console.log(
//     "promise-related error when checking if user exists" +
//       " ...at.... " +
//       filename
//   );
//   done(err, null);
// });

// console.log("accessToken : ", accessToken);
// console.log("refreshToken : ", refreshToken);
// console.log("Google profile ID: ", profile.id);
// // console.log("done : ", done);
// console.log("\nLOG statements are AT : ", __filename);
