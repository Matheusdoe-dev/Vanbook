const express = require("express");
const path = require("path");
const cors = require("cors");

const routes = require("./routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app", "views"));

app.use(cors());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(routes);

module.exports = app;
