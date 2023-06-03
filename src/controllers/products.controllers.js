const { response } = require("../helpers/response");
const productsService = require("../services/products.service");

const getProducts = () => {
  return async (req, res, next) => {
    try {
      const products = await productsService.getProducts();
      res.status(200).json(response(products));
    } catch (error) {
      next(error);
    }
  };
};

const likeProduct = () => {
  return async (req, res, next) => {
    try {
      const { userId, productId } = req.body;
      await productsService.likeProduct(userId, productId);
      res.status(200).json(response("OK"));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getProducts,
  likeProduct,
};
