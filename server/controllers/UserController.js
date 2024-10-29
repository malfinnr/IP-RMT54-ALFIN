const { User } = require("../models");
const bcrypt = require("bcrypt");
const { signToken } = require("../helpers/jwt");
require("dotenv").config();

class UserController {
  static async postAddUser(req, res, next) {
    try {
      const { fullName, userName, email, password, gender, dateOfBirth } =
        req.body;
      const newUser = await User.create({
        fullName,
        userName,
        email,
        password,
        gender,
        dateOfBirth,
      });
      const updatedUser = {
        id: newUser.id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        email: newUser.email,
        gender: newUser.gender,
        dateOfBirth: newUser.dateOfBirth,
      };
      res
        .status(201)
        .json({ message: "User Added Successfully", data: updatedUser });
    } catch (error) {
      next(error);
    }
  }
  static async postLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        // return res.status(400).json({ message: "Email is Required" });
        throw {
          name: "BadRequest",
          message: "Email is Required",
        };
      }
      if (!password) {
        // return res.status(400).json({ message: "Password is Required" });
        throw {
          name: "BadRequest",
          message: "Password is Required",
        };
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        // res.status(400).json({ message: "Invalid Email or Password" });
        throw {
          name: "BadRequest",
          message: "Invalid Email or Password",
        };
      }
      const validationPassword = bcrypt.compareSync(password, user.password);
      if (!validationPassword) {
        // res.status(401).json({ message: "Invalid Email or Password" });
        throw {
          name: "Unauthorized",
          message: "Invalid Email or Password",
        };
      }
      const generateLoad = {
        id: user.id,
        username: user.username,
      };
      const accessToken = signToken(generateLoad);
      return res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
