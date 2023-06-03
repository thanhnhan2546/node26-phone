const { response } = require("../helpers/response");
const { loginService, loginAdminService } = require("../services/auth.service");

const login = () => {
  return async (req, res, next) => {
    try {
      const login = await loginService(req.body);

      res.status(200).json(response(login));
    } catch (error) {
      next(error);
    }
  };
};
const loginAdmin = () => {
  return async (req, res, next) => {
    try {
      const login = await loginAdminService(req.body);

      res.status(200).json(response(login));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  login,
  loginAdmin,
};
