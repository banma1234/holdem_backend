import tableManager from "../../game/TableManager";
const express = require("express");
const router = express.Router();

module.exports = function (io) {
  router.post("/tableId/:tableId", (req, res) => {
    try {
      const { tableId } = req.params;

      const tableSocket = io.of(`/table/${tableId}`).on("connection", () => {
        console.log(`테이블 생성 완료 : ${tableId}`);
      });

      const gameSocket = io
        .of(`/game/${tableId}`)
        .on("connection", (socket) => {
          console.log(`게임 생성 완료 : ${socket.id}`);
        });

      tableManager.createTable(tableSocket, gameSocket, tableId);

      res.status(200).json({ success: true, message: "방이 생성되었습니다." });
    } catch (err) {
      console.error("Error while creating table socket:", err);
      res
        .status(500)
        .json({ success: false, message: "방 생성에 실패하였습니다." });
    }
  });

  return router;
};
