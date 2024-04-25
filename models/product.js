"use strict";
const { Model } = require("sequelize");
const formatCurrencyToUSD = require('../helpers/formatCurrency');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    get priceUSD(){
      return formatCurrencyToUSD(this.price);
    }

    static async getProductByCatgeory(category){
      const products = await Product.findAll({
        include : sequelize.models.Category,
        where : category ? {CategoryId: category} : {},
        order : [['id', 'ASC']]
      })
      return products
    }
    
    static associate(models) {
      Product.belongsTo(models.Category);
      Product.belongsToMany(models.User, {through: models.Order})
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
