const express = require("express");
const cors = require("cors");
const routes = require("../routes/index");
const error = require("../middlewares/error");

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(error);

module.exports = app;
