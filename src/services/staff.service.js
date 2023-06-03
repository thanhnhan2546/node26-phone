const { AppError } = require("../helpers/error");
const { Staff } = require("../models");
const bcrypt = require("bcrypt");

class StaffService {
  async getStaff() {
    try {
      const staff = await Staff.findAll();
      return staff;
    } catch (error) {
      throw error;
    }
  }
  async getOne(id) {
    try {
      const staff = await Staff.findByBk(id);
      return staff;
    } catch (error) {
      throw err;
    }
  }
  async createStaff(staff) {
    console.log("staff: ", staff);
    try {
      const checkUnique = await Staff.findOne({ where: { MaNV: staff.MaNV } });
      if (checkUnique) {
        throw new AppError(400, "MaNV is existed");
      }
      const salt = bcrypt.genSaltSync();

      const hashPassword = bcrypt.hashSync(staff.Pass, salt);
      staff = { ...staff, Pass: hashPassword };
      console.log("staff: ", staff);
      const createUser = await Staff.create(staff);

      return createUser;
    } catch (error) {
      throw new AppError(400, error.errors[0].message);
    }
  }
}

const staffService = new StaffService();

module.exports = staffService;
