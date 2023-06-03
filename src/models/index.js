//Đây là lớp data accesser
//Setup Sequelize
// Phải cài thêm mysql2 : yarn add sql2, npm i sql2
const { Sequelize } = require("sequelize");
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  DB_NAME,
} = require("../config");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: DB_DIALECT,
  host: DB_HOST,
  port: DB_PORT,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected");
  } catch (error) {
    console.log("Sequelize Error: ", error);
  }
})();

//--------------Định nghĩa relationship-----------------
const User = require("./User")(sequelize);
const Order = require("./Order")(sequelize);
const Products = require("./Products")(sequelize);
const ProductsLikes = require("./ProductsLikes")(sequelize);
const Staff = require("./Staff")(sequelize);

// 1-n
Order.belongsTo(User, { as: "user", foreignKey: "idUser" });
User.hasMany(Order, { as: "order", foreignKey: "idUser" });

// n-n
User.belongsToMany(Products, {
  as: "productLikes",
  through: ProductsLikes,
  foreignKey: "id_User",
});

Products.belongsToMany(User, {
  as: "userLikes",
  through: ProductsLikes,
  foreignKey: "idSP",
});

module.exports = {
  sequelize,
  User,
  Order,
  Products,
  Staff,
};
