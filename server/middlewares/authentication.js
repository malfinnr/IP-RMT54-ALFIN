const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  const bearerToken = req.headers["authorization"];
  console.log(bearerToken);
  if (!bearerToken) {
    next({
      name: "Unauthorized",
      message: "Invalid Token",
    });
    return;
  }

  const [, token] = bearerToken.split(" ");
  if (!token) {
    next({
      name: "Unauthorized",
      message: "Invalid Token",
    });
    return;
  }
  try {
    const data = verifyToken(token);
    const user = await User.findByPk(data.id);
    if (!user) {
      next({
        name: "Unauthorized",
        message: "Invalid Token",
      });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
