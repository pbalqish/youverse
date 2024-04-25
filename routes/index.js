const router = require('express').Router();
const Controller = require('../controllers/controller');

// Register
router.get('/signup', Controller.renderSignUp)
router.post('/signup', Controller.handleSignUp)

// Login
router.get('/login', Controller.renderLogin)
router.post('/login', Controller.handleLogin)

// router.use(function (req, res, next) {
//   console.log(req.session);
//   if (!req.session.userId) {
//     const error = `Please login first`
//     res.redirect(`/login?error=${error}`)
//   }
//   next()
// })

const isLoggedIn = function (req, res, next) {
  console.log(req.session);
  if (!req.session.userId) {
    const error = `Please login first`
    res.redirect(`/login?error=${error}`)
  }
  next()
}

const isAdmin = function (req, res, next) {
  console.log(req.session);
  if (req.session.userId && req.session.role !== 'admin') {
    const error = `You have no acceee`
    res.redirect(`/login?error=${error}`)
  }
  next()
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
router.get('/', isLoggedIn, Controller.renderHome);
router.get('/admin', isAdmin, Controller.renderHomeAdmin);

//other routes
router.get('/products/:id', Controller.renderProductDetail)
router.get('/profile', Controller.getProfile)


module.exports = router;