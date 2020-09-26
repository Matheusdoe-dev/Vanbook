const express = require("express");
// controllers
const LibraryController = require("../app/controllers/LibraryController");

// Router
const routes = express.Router();

// get landing page
routes.get("/", LibraryController.landingPage);

// get library page
routes.get("/library", LibraryController.libraryPage);

// get book page (dinamic route)
routes.get("/library/books/:id", LibraryController.bookPage);

// get cart page
routes.get("/library/cart", LibraryController.cartPage);

// get checkout page
routes.get("/library/checkout", LibraryController.checkoutPage);

// get checkout-end page
routes.get("/library/checkout/end", LibraryController.checkoutEndPage);

module.exports = routes;
