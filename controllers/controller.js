const { Category, Order, Product, Profile, User } = require('../models/index')
const formatCurrencyToUSD = require('../helpers/formatCurrency')

class Controller{
  static async renderHome(req, res){
    try {
      const products = await Product.findAll()
      res.render('Home', {products, formatCurrencyToUSD})
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async renderProductDetail(req, res){
    try {
      const { id } = req.params
      const product = await Product.findByPk(id)
      res.render('ProductDetail', {product, formatCurrencyToUSD})
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async renderLogin(req, res){
    try {
      res.render('FormLogin')
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async renderSignUp(req, res){
    try {
      res.render('FormRegister')
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async handleSignUp(req, res){
    try {
      const { fullName, email, username, password } = req.body
      await Profile.create({fullName})
      await User.create({email, username, password})
      // res.redirect()
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = Controller;