const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// API 라우트에 io 전달
app.use("/api", apiRoutes(io));

// 서버 포트 설정 및 시작
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
