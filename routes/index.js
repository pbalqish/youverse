const router = require('express').Router();
const Controller = require('../controllers/controller');

const { Category, Order, Product, Profile, User } = require('../models/index') //sementara, nanti hapus yaw

router.get('/', Controller.renderHome);
router.get('/products/:id', Controller.renderProductDetail)
router.get('/login', Controller.renderLogin)
// router.post('/login', Controller.)
router.get('/signup', Controller.renderSignUp)
router.post('/signup', Controller.handleSignUp)


module.exports = router;