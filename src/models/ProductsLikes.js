const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "ProductsLikes",
    {
      idSP: {
        type: DataTypes.INTEGER,
        field: "id_SP",
      },
      idUser: {
        type: DataTypes.INTEGER,
        field: "id_User",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",

        //current timestamps
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "product_likes",
      timestamps: false,
    }
  );
};
