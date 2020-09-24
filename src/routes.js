const express = require("express");
// controllers
const LibraryController = require("./app/controllers/LibraryController");

// Router
const routes = express.Router();

// get landing page
routes.get("/", LibraryController.landingPage);

module.exports = routes;
