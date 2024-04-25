"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category);
      Product.hasMany(models.Order);
      // define association here
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: `Name is required` },
        },
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: { msg: `Description is required` },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: `Price is required` },
          min: 5,
        },
      },
      stock: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
