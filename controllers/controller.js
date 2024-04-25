const {
  Category,
  Order,
  Product,
  Profile,
  User,
  sequelize,
} = require("../models/index");
const formatCurrencyToUSD = require("../helpers/formatCurrency");
const bcrypt = require("bcryptjs");

class Controller {
  static async renderHome(req, res) {
    try {
      const products = await Product.findAll();
      res.render("Home", { products, formatCurrencyToUSD });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async renderProductDetail(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      res.render("ProductDetail", { product, formatCurrencyToUSD });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async renderLogin(req, res) {
    try {
      res.render("FormLogin");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async handleLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          return res.redirect("/");
        }
        const errorMessage = `Email or Password is not correct`;
        return res.redirect(`/login?error=${errorMessage}`);
      }
      const errorMessage = `Email or Password is not correct`;
      return res.redirect(`/login?error=${errorMessage}`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async renderSignUp(req, res) {
    try {
      res.render("FormSignUp");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async handleSignUp(req, res) {
    try {
      await sequelize.transaction(async (t) => {
        const { fullName, email, username, password } = req.body;
        const user = await User.create(
          {
            email,
            username,
            password,
          },
          {
            transaction: t,
          }
        );
        await Profile.create(
          {
            fullName,
            UserId: user.id,
          },
          {
            transaction: t,
          }
        );
      });
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async getProfile() {
    try {
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = Controller;
