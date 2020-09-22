const express = require("express");
// controllers
const ShopController = require("./app/controllers/ShopController");

// Router
const routes = express.Router();

// get landing page
routes.get("/", ShopController.landingPage);

module.exports = routes;
