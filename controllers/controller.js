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
const { where } = require("sequelize");

class Controller {
  static async renderHome(req, res) {
    try {
      const {role} = req.session
      const products = await Product.findAll();
      res.render("Home", { products, role });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async getProductBuy(req, res) {
    try {
      const {id} =req.params
      
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }

  static async renderProductDetail(req, res) {
    try {
      const {role} = req.session
      const { id } = req.params;
      const product = await Product.findByPk(id);
      res.render("ProductDetail", { product, role });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async renderLogin(req, res) {
    try {
      const { error } = req.query
      res.render("FormLogin", { error });
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

          req.session.userId = user.id
          req.session.role = user.role
          return res.redirect("/");
        }

        const errorMessage = `Invalid Email/Password`;
        return res.redirect(`/login?error=${errorMessage}`);
      }

      const errorMessage = `Invalid Email/Password`;
      return res.redirect(`/login?error=${errorMessage}`);
    } catch (error) {

      console.log(error);
      res.send(error);
    }
  }

  static async renderSignUp(req, res) {
    try {
      let errors = []
      if (req.query.errors) {
        errors = req.query.errors.split(',')
      }
      console.log(req.query);
      res.render("FormSignUp", { errors });
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
      if (error.name === 'SequelizeValidationError') {
        const errMess = error.errors.map(e => e.message)
        return res.redirect(`/signup?errors=${errMess}`)
      }
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

  static async renderHomeAdmin(req, res){
    try {
      const products = await Product.findAll();
      res.render("homeadmin", { products });
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }

  static async renderAddProduct(req,res){
    try {
      const categories = await Category.findAll()
      res.render("AddProduct", {categories})
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }

  static async handleAddProduct(req,res){
    try {
      const { name, price, stock, description, CategoryId } = req.body
      const { filename } = req.file

      await Product.create({name, price, stock, description, CategoryId, image: filename})
      res.redirect('/')
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }

  static async renderEditProduct(req,res){
    try {
      const { id } = req.params
      const categories = await Category.findAll()
      const product = await Product.findByPk(id)
      res.render("EditProduct", {product, categories})
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }

  static async handleEditProduct(req,res){
    try {
      const { id } = req.params
      const { name, price, stock, description, CategoryId } = req.body
      const { filename } = req.file

      await Product.update({name, price, stock, description, CategoryId, image: filename}, {
        where: {
          id
        }
      })
      res.redirect('/')
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }

  static async handleDeleteProduct(req,res){
    try {
      const { id } = req.params
      await Product.destroy({
        where: {
          id
        }
      })
      res.redirect('/')
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }

  static async handleLogout(req, res) {
    try {
      req.session.destroy(()=>{
        console.log(`destroyed`);
      })
      res.redirect('/')
    } catch (error) {
      
    }
  }
}

module.exports = Controller;
