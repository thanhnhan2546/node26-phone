const express = require("express");
const {
  getStaff,
  createStaff,
} = require("../../controllers/staff.controllers");

const staffRouters = express.Router();

staffRouters.get("", getStaff());
staffRouters.post("", createStaff());

module.exports = staffRouters;
