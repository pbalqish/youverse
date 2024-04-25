const router = require('express').Router();
const Controller = require('../controllers/controller');

router.get('/', Controller.renderHome);
router.get('/products/:id', Controller.renderProductDetail)

module.exports = router;