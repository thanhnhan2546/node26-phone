const { Products, User } = require("../models");
const { AppError } = require("../helpers/error");

class ProductsService {
  async getProducts() {
    try {
      const products = await Products.findAll({
        include: {
          association: "userLikes",
          // bỏ đi các bảng trung gian, vd trong response này sẽ bỏ đi cái productLike của user
          through: {
            attributes: [],
          },
        },
      });

      return products;
    } catch (error) {
      throw error;
    }
  }
  async likeProduct(userId, productId) {
    try {
      const product = await Products.findByPk(productId);

      if (!product) {
        throw new AppError(400, "Product not found");
      }
      const user = await User.findByPk(userId);

      if (!product) {
        throw new AppError(400, "User not found");
      }

      const hasUserLike = await product.hasUserLike(user.userId);
      if (!hasUserLike) {
        await product.addUserLike(user.userId);
      } else {
        await product.removeUserLike(user.userId);
      }

      /** show tất cả prototype (property, method) */
      // console.log("products: ", product.__proto__);
    } catch (error) {
      throw error;
    }
  }
}

const productsService = new ProductsService();
module.exports = productsService;
