const { AppError } = require("../helpers/error");
const { User } = require("../models");
const { Op } = require("sequelize");
const Order = require("../models/Order");
class UserService {
  async getUser() {
    try {
      const users = await User.findAll({
        include: [
          {
            association: "order",
          },
          {
            association: "productLikes",
            // bỏ đi các bảng trung gian, vd trong response này sẽ bỏ đi cái productLike của user
            through: {
              attributes: [],
            },
          },
        ],
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  async GetOneUser(userId) {
    try {
      const getOneUser = await User.findOne({ where: { userId } });
      return getOneUser;
    } catch (error) {
      throw error;
    }
  }

  async createUser(user) {
    try {
      // const getOneUser = await this.getOneUserOrEmail(user);
      // console.log("getOneUser: ", getOneUser);

      if (await this.CheckUniqueUserOrEmail(user, null)) {
        throw new Error("Username or Email is existed");
      }

      const createdUser = await User.create(user);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async CheckUniqueUserOrEmail(user, id) {
    try {
      const getOne = await User.findOne({
        where: {
          [Op.or]: {
            email: user.email,
            username: user.username,
          },
          [Op.and]: {
            userId: { [Op.ne]: id },
          },
        },
      });
      if (getOne) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, user) {
    try {
      if (!(await this.GetOneUser(id))) {
        throw new AppError(400, "user is not found !!");
      }
      if (await this.CheckUniqueUserOrEmail(user, id)) {
        throw new AppError(400, "Username or Email is existed");
      }
      await User.update(user, {
        where: {
          userId: id,
        },
      });
      const updateUser = this.GetOneUser(id);
      return updateUser;
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }

  async deleteUser(userId) {
    try {
      const deletedUser = await User.destroy({
        where: {
          userId,
        },
      });
      if (!deletedUser) {
        throw new AppError(400, "User not found");
      }
    } catch (error) {
      throw error;
    }
  }
}

const userService = new UserService();

module.exports = userService;
