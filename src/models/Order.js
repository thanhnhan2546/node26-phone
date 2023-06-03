const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Order",
    {
      idHD: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nameUser: {
        type: DataTypes.STRING,
        field: "name_user",
      },
      emailUser: {
        type: DataTypes.STRING,
        unique: true,
        field: "email_user",
        validate: {
          isEmail: {
            msg: "Invalid Email",
          },
        },
      },
      phone: {
        type: DataTypes.STRING(11),
        validate: {
          isNumeric: {
            msg: "Invalid Phone",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
      },
      total: {
        type: DataTypes.FLOAT,
      },
      payment: {
        type: DataTypes.STRING,
      },
      createAt: {
        type: DataTypes.STRING,
        field: "create_at",
      },
      status: {
        type: DataTypes.TINYINT,
      },
    },
    {
      tableName: "donhang",
      timestamps: false,
    }
  );
};
