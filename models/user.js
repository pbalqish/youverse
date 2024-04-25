"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order);
      User.hasOne(models.Profile);
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Email is required.` },
          notNull: { msg: `Email can't be null.` },
          isEmail: { msg: `Please enter valid Email.` },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: `Password is required` },
          len: {
            args: [8],
            msg: `Minimum password is 8 characters`,
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['Admin', 'Buyer']]
        }
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeValidate((user, option)=>{
    user.role = 'Buyer'
  })
  return User;
};
