const userController = require("./user_controller");
const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement
    let email= req.body.email;
    let password = req.body.password;
    let user = userController.getUserByEmailIdAndPassword(email, password);
    if (user){
      let name = user.password;
      res.redirect("reminders/?name=" + name);
    }
    else {
      res.redirect("login");
    }
 },

  registerSubmit: (req, res) => {
    // implement
  },
};

module.exports = authController;
