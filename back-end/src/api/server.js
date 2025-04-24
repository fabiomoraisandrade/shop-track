require("dotenv").config();
const http = require("http");

const { API_PORT = 3001 } = process.env;
const app = require("./app");

const server = http.createServer(app);

server.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
