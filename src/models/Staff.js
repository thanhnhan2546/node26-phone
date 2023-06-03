const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Staff",
    {
      STT: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      MaNV: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      Ten: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      SDT: {
        type: DataTypes.STRING(12),
        allowNull: false,
      },
      DiaChi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      NgaySinh: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      GioiTinh: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      Luong: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Pass: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      TrangThai: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      PhanQuyen: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      tableName: "nhanvien",
      timestamps: false,
      defaultScope: {
        attributes: {
          exclude: ["Pass"],
        },
      },
    }
  );
};
