const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { apiRoutes } = require("./routes/api");
const setupTableSocket = require("./websocket/tableSocket");
const TableManager = require("./TableManager");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const tableManager = new TableManager(); // TableManager 인스턴스 생성

// Middleware
app.use(express.json());

// API Routes
apiRoutes(app, tableManager);

// Setup WebSocket
setupTableSocket(io, tableManager);

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
