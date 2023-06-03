const { response } = require("../helpers/response");
const staffService = require("../services/staff.service");
const getStaff = () => {
  return async (req, res, next) => {
    try {
      const staffs = await staffService.getStaff();
      res.status(200).json(response(staffs));
    } catch (error) {
      next(error);
    }
  };
};

const createStaff = () => {
  return async (req, res, next) => {
    try {
      const staff = req.body;
      const createStaff = await staffService.createStaff(staff);
      res.status(200).json(response(createStaff));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getStaff,
  createStaff,
};
