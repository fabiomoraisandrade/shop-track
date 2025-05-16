const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const routes = require("../routes/index");
const error = require("../middlewares/error");

const app = express();

app.use(cors());

app.use(fileUpload());

app.use(express.json());

app.use(routes);

app.use(error);

module.exports = app;
