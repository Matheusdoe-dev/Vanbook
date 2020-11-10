const express = require('express');
// controllers
const LibraryController = require('../app/controllers/LibraryController');

// Router
const routes = express.Router();

// get landing page
routes.get('/', LibraryController.landingPage);

// get library page
routes.get('/library', LibraryController.libraryPage);

// get book page (dynamic route)
routes.get('/library/books/:id', LibraryController.bookPage);

// get cart
routes.get('/library/cart', LibraryController.cartPage);

// add product to cart
routes.post('/library/cart', LibraryController.addToCart);

// delete product from cart
routes.post('/library/cart/delete', LibraryController.removeFromCart);

// post order checkout
routes.post('/library/checkout', LibraryController.checkout);

// get checkout page
routes.get('/library/checkout', LibraryController.checkoutPage);

// get checkout-end page
routes.get('/library/checkout/end', LibraryController.checkoutEndPage);

module.exports = routes;
