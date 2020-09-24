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
routes.get("/library/:id", LibraryController.bookPage);

module.exports = routes;
