const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

//Nếu làm như vậy thì nếu tạo relationship (1-1, 1-n, n-n) trong file index sẽ bị circle depedency
// Circle depedency là file A import file B và file B import file A và có thể xảy ra hiện tượng lặp vô

/*
const sequelize = require(".");
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,

      // -----------------------getter và setter---------------------
      //Setter thay đổi giá trị trước khi truyền xuống db /
      //  Ví dụ: hash password bằng thư viện bcrypt
      //   Sẽ được chạy trước khi create/update
      set(value) {
        const salt = bcrypt.genSaltSync();

        const hashPassword = bcrypt.hashSync(value, salt);
        this.setDataValue("password", hashPassword);
      },
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "full_name",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Invalid email",
        },

        //Tự custom validation, Có thể đặt mọi tên
        customValidation  : (value) => {
          // logic validation
          // Nếu không thỏa mãn logic
          //  => throw new Error("message")
        },
      },
    },
    phone: {
      type: DataTypes.STRING(100),
    },
    address: {
      type: DataTypes.STRING(100),
    },
  },
  {
    tableName: "user",
    //disable createAt, updateAt
    timestamps: false,
    // Bỏ qua column password khi trả về client sau khi get
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
    //Cách 1: Bỏ qua column password khi trả về client sau khi create
    hooks: {
      afterCreate: (record) => {
        delete record.dataValues.password;
      },
    },
  }
);
//Cách 2: Bỏ qua column password khi trả về client sau khi create
// User.afterCreate((record) => {
//   delete record.dataValues.password;
// });

module.exports = User;
*/

//--------------Cách giải quyết-----------------------

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "user_id",
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
          const salt = bcrypt.genSaltSync();

          const hashPassword = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hashPassword);
        },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "full_name",
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Invalid email",
          },
        },
      },
      phone: {
        type: DataTypes.STRING(100),
        validate: {
          isNumeric: {
            msg: "Invalid phone",
          },
        },
      },
      address: {
        type: DataTypes.STRING(100),
      },
      avatar: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "user",
      //disable createAt, updateAt
      timestamps: false,
      // Bỏ qua column password khi trả về client sau khi get
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
      hooks: {
        afterCreate: (record) => {
          delete record.dataValues.password;
        },
      },
    }
  );
};
