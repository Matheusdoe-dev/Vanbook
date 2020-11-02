const express = require("express");
// controllers
const AdminController = require("../app/controllers/AdminController");
// Router
const routes = express.Router();

// get - admin library page
routes.get("/", AdminController.libraryPage);

// get - admin library book page (dynamic route)
routes.get("/books/:id", AdminController.bookPage);

// get - add new book page
routes.get("/add-new", AdminController.addNewBookPage);

// post - add a new bok
routes.post("/add-new", AdminController.addNewBook);

// get - edit book page
routes.get("/edit-book/:id", AdminController.editBookPage);

// post - edit book
routes.post("/edit-book", AdminController.editBook);

// post - edit book
routes.post("/delete-book", AdminController.deleteBook);

module.exports = routes;
