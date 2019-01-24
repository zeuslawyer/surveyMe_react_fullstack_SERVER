const proxy = require("http-proxy-middleware");
const SERVER_URI = "http://localhost:5000";

module.exports = function(app) {
  app.use(proxy("/auth/google", { target: SERVER_URI }));
  app.use(proxy("/api/*", { target: SERVER_URI }));
};
