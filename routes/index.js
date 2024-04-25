const router = require('express').Router();
const Controller = require('../controllers/controller');

router.get('/', Controller.renderHome);
router.get('/signup', Controller.renderSignUp)
router.post('/signup', Controller.handleSignUp)
router.get('/login', Controller.renderLogin)
router.post('/login', Controller.handleLogin)
router.get('/products/:id', Controller.renderProductDetail)
router.get('/profile', Controller.getProfile)


module.exports = router;