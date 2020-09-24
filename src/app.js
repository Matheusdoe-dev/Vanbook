const express = require("express");
const path = require("path");
const cors = require("cors");

const libraryRoutes = require("./routes/library");

const app = express();

// template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app", "views"));

app.use(cors());
// set static files path to express method argument
app.use(express.static(path.join(__dirname, "..", "public")));

// routes
app.use(libraryRoutes);

module.exports = app;
