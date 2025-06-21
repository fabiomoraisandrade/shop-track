require("dotenv").config();
const http = require("http");
const socket = require("socket.io");
const socketListener = require("../socket");
const app = require("./app");

const PORT = process.env.PORT;
const SOCKET_CLIENT_ORIGIN = process.env.SOCKET_CLIENT_ORIGIN;

const server = http.createServer(app);

const io = socket(server, {
  cors: {
    origin: SOCKET_CLIENT_ORIGIN,
    methods: ["GET", "POST"],
  },
});

socketListener(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
