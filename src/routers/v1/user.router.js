const express = require("express");
const {
  getUsers,
  createUsers,
  deleteUsers,
  updateUser,
  getOneUsers,
} = require("../../controllers/users.controllers");
const userRouters = express.Router();

//path userRouters: /api/v1/users

// userRouters.get("", getUsers);

/** Cách 2: Dùng cách này có thể truyền tham số khi cần */
userRouters.get("", getUsers());
userRouters.post("", createUsers());
userRouters.put("/:id", updateUser());
userRouters.get("/:id", getOneUsers());
userRouters.delete("/:id", deleteUsers());

module.exports = userRouters;
