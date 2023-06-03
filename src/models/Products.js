const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Products",
    {
      idSP: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idLSP: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tenSP: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "tensp",
      },
      gia: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      mota: {
        type: DataTypes.STRING,
      },
      hinhAnh: {
        type: DataTypes.STRING,
        field: "hinhanh",
      },
    },
    {
      tableName: "sanpham",
      timestamps: false,
    }
  );
};
