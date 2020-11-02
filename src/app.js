const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const libraryRoutes = require("./routes/library");
const adminRoutes = require("./routes/admin");

const app = express();

// template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app", "views"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// set static files path to express method argument
app.use(express.static(path.join(__dirname, "..", "public")));

// routes
app.use(libraryRoutes);
app.use("/admin", adminRoutes);

module.exports = app;
