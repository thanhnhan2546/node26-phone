const { AppError } = require("../helpers/error");
const { User, Staff } = require("../models");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const { Op, literal } = require("sequelize");
const { JWT_SERCRET } = require("../config");

const loginService = async (credential) => {
  try {
    const { username, password } = credential;

    const user = await User.findOne({
      where: { username },
      attributes: { include: ["password"] },
    });

    if (!user) {
      throw new AppError(400, "email or password invalid");
    }

    const isMatched = bcrypt.compareSync(password, user.password);
    if (!isMatched) {
      throw new AppError(400, "email or password invalid");
    }
    const token = jwt.sign(
      {
        id: user.userId,
        username: user.username,
        email: user.email,
      },
      JWT_SERCRET,
      { expiresIn: "2d" }
    );
    delete user.dataValues.password;
    return { user, access_token: `Bearer ${token}` };
  } catch (error) {
    throw error;
  }
};
const loginAdminService = async (credential) => {
  try {
    const { username, password } = credential;

    const user = await Staff.findOne({
      // phân biệt hoa thường bằng binary
      where: {
        [Op.and]: literal(`BINARY MaNV = '${username}'`),
      },
      attributes: { include: ["Pass"] },
    });

    if (!user) {
      throw new AppError(400, "email or password invalid");
    }

    const isMatched = bcrypt.compareSync(password, user.Pass);
    if (!isMatched) {
      throw new AppError(400, "email or password invalid");
    }
    const token = jwt.sign(
      {
        id: user.STT,
        username: user.MaNV,
        email: user.Ten,
        role: user.PhanQuyen,
      },
      process.env.JWT_SERCRET,
      { expiresIn: "2d" }
    );
    delete user.dataValues.Pass;
    return { user, access_token: `Bearer ${token}` };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginService,
  loginAdminService,
};
