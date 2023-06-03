const { AppError } = require("../helpers/error");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new AppError(401, "Require authorization ");
  const accessToken = token.split(" ")[1];
  jwt.verify(accessToken, process.env.JWT_SERCRET, (err, user) => {
    if (err) throw new AppError(401, "Token may be expired or invalid");
    req.user = user;
    next();
  });
};

module.exports = auth;
