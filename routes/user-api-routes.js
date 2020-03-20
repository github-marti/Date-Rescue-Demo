const passport = require("../config/passport");
const { usersController } = require("../controllers")

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json({ username: req.user.username, id: req.user.id, phoneNumber: req.user.phoneNumber });
  });
  app.post("/api/signup", usersController.create);
  app.get("/api/logout", usersController.logOut);
  app.get("/api/user_data", usersController.getUserData);
};
