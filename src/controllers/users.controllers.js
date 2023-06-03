const { response } = require("../helpers/response");
const userService = require("../services/users.service");

// const getUsers = async (req, res) => {
//   try {
//     const users = await userService.getUser();
//     res.status(200).json({ data: users });
//   } catch (error) {
//     res.status(400).json({ error: error });
//   }
// };

/*Cách 2: nên dùng cách này để có khi client chưa gọi tới thì hàm đã chạy 
và có thể truyền tham số khi cần */
//Closure function
const getUsers = () => {
  return async (req, res, next) => {
    try {
      const users = await userService.getUser();

      res.status(200).json(response(users));
    } catch (error) {
      // res.status(400).json({ error: error });
      // Chuyển tiếp cái error xuống middleware handleErrors
      next(error);
    }
  };
};

const getOneUsers = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await userService.GetOneUser(id);
      res.status(200).json(response(user));
    } catch (error) {
      // res.status(400).json({ error: error });
      next(error);
    }
  };
};

const createUsers = () => {
  return async (req, res, next) => {
    try {
      const user = req.body;
      const createUser = await userService.createUser(user);
      res.status(200).json(response(createUser));
    } catch (error) {
      // res.status(400).json({ error: error.message });
      next(error);
    }
  };
};

const updateUser = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.body;

      const updateUser = await userService.updateUser(id, user);
      res.status(200).json(response(true));
    } catch (error) {
      // res.status(400).json({ error: error.message });
      next(error);
    }
  };
};

const deleteUsers = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;

      const createUser = await userService.deleteUser(id);
      res.status(200).json(response("user " + id + " is deleted"));
    } catch (error) {
      // res.status(400).json({ error: error });
      next(error);
    }
  };
};
module.exports = {
  getUsers,
  getOneUsers,
  createUsers,
  updateUser,
  deleteUsers,
};
