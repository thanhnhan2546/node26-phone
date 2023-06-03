const express = require("express");
const userRouters = require("./user.router");
const productsRouter = require("./products.router");
const { login, loginAdmin } = require("../../controllers/auth.controllers");
const staffRouters = require("./staff");
const v1 = express.Router();
const auth = require("../../middlewares/Authorization");
const { verifyAdmin, verifyManager } = require("../../middlewares/checkRole");
const uploadController = require("../../controllers/upload.controllers");
const upload = require("../../middlewares/uploadFile");

//path v1 : /api/v1

v1.use("/products", productsRouter);
v1.post("/login", login());
v1.post("/Admin/login", loginAdmin());

// Upload file (img, peg, png, pdf, doc)
v1.post("/upload", upload.single("file"), uploadController.upload());

v1.use(auth);
v1.use("/users", verifyAdmin, userRouters);
v1.use("/staff", staffRouters);

module.exports = v1;
