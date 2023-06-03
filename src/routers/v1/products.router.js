const express = require("express");
const {
  getProducts,
  likeProduct,
} = require("../../controllers/products.controllers");

const productsRouter = express.Router();

productsRouter.get("", getProducts());
productsRouter.post("/like", likeProduct());

module.exports = productsRouter;
