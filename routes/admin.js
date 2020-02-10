const path = require('path');
//requiring
const {body} = require('express-validator/check');

const express = require('express');

const adminController = require('../controller/admin');

const isAuth = require('../middleware/is-auth');

const routes = express.Router();

routes.get('/add-product', isAuth, adminController.getAddProduct);

routes.post('/add-product', 
  [
    body('title')
      .isString()
      .trim()
      .isLength({min: 3}),
    body('price')
      .trim()
      .isFloat(),
    body('imageUrl')
      .isURL()
      .trim(),
    body('description') 
      .isLength({min: 5, max: 400})
      .trim()
  ], isAuth, adminController.postAddProduct);

routes.get('/products', isAuth,adminController.getProducts)

routes.get('/edit-product/:productID', isAuth, adminController.getEditProduct);

routes.post('/edit-product',
  [
    body('title')
    // .isAlphanumeric => isString
      .isString()
      .trim()
      .isLength({min: 3}),
    body('price')
      .trim()
      .isNumeric(),
    body('imageUrl')
      .isURL()
      .trim(),
    body('description')
      .isLength({min: 5, max: 400})
      .trim()
  ],
  isAuth, adminController.postEditProduct);

routes.post('/delete-product', isAuth, adminController.postDeleteProduct);


module.exports = routes;
