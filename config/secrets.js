//OK TO COMMIT THIS

if (process.env.NODE_ENV === "production") {
  //we are in prod so use heroku env variables
  module.exports = require("./prod-secrets");
} else {
  //we are in dev so use dev keys
  module.exports = require("./dev-secrets");
}
