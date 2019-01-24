const app = require("../index.js");

module.exports = app => {
  app.get("/", (req, res) => {
    console.log("\nroot endpoint hit..." + Date.now() + "\n");
    res.send({ body: "Hi, there!" });
  });
};
