const request = require("request");
const jwt = require("jsonwebtoken");
const User = require("../Model/User.js");
const bcrypt = require('bcrypt');

const keyToken = "123456";
const saltRounds = 10;

class AccountController {
  // get all User
  async login(req, res, next) {
    let user = await User.findOne({ email: req.body.email });
    //console.log(user);
    if (user != null) {
      let token = jwt.sign(
        {
          id: user.id,
        },
        keyToken
      );
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result)
          res.send({
            status: true,
            data: { token: token, name: user.name, role: user.role },
          });
        else res.send({ status: false, data: "sai mat khau" });
      });
    } else res.send({ status: false, data: "error" });
  }
}

module.exports = new AccountController();
