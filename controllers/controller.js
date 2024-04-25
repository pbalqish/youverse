const { Category, Order, Product, Profile, User } = require('../models/index')
const formatCurrencyToUSD = require('../helpers/formatCurrency')

class Controller{
  static async renderHome(req, res){
    try {
      const products = await Product.findAll()
      res.render('Home', {products, formatCurrencyToUSD})
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }

  static async renderProductDetail(req, res){
    try {
      const { id } = req.params
      const product = await Product.findByPk(id)
      res.render('ProductDetail', {product, formatCurrencyToUSD})
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }

  static async renderAddProduct(req, res){
    
  }
}

module.exports = Controller;