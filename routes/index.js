const router = require('express').Router();
const Controller = require('../controllers/controller');

// Register
router.get('/signup', isLoggedOut, Controller.renderSignUp)
router.post('/signup', isLoggedOut, Controller.handleSignUp)

// Login
router.get('/login', isLoggedOut, Controller.renderLogin)
router.post('/login', isLoggedOut, Controller.handleLogin)

// router.use(function (req, res, next) {
//   console.log(req.session);
//   if (!req.session.userId) {
//     const error = `Please login first`
//     res.redirect(`/login?error=${error}`)
//   }
//   next()
// })

function isLoggedOut(req, res, next) {
  if (req.session.userId) {
    res.redirect(`/`)
  }else{
    next()
  }
}



const isLoggedIn = function (req, res, next) {
  console.log(req.session);
  if (!req.session.userId) {
    const error = `Please login first`
    res.redirect(`/login?error=${error}`)
  }else{
    next()
  }
}

const isAdmin = function (req, res, next) {
  console.log(req.session);
  if (req.session.role === 'admin') {
    next()
  } else {
    res.redirect(`/`)
  }
}

// router.use(function (req, res, next) {
//   console.log(req.session);
//   if (req.session.userId && req.session.role !== 'admin') {
//     const error = `You have no acceee`
//     res.redirect(`/login?error=${error}`)
//   }
//   next()
// })


// Home
router.get('/', Controller.renderHome);

router.use(isLoggedIn)

router.get('/admin', Controller.renderHomeAdmin);
//other routes
router.get('/admin/product/add', isAdmin, Controller.renderAddProduct)
router.post('/admin/product/add', Controller.handleAddProduct)

router.get('/admin/product/:id/edit', Controller.renderEditProduct)
router.post('/admin/product/:id/edit', Controller.handleEditProduct)

router.get('/admin/product/:id/delete', Controller.handleDeleteProduct)

router.get('/products/:id', Controller.renderProductDetail)
router.get('/products/:id/buy', Controller.getProductBuy)
router.get('/profile', Controller.getProfile)
router.get('/logout', Controller.handleLogout)


module.exports = router;