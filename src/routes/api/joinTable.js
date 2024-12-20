import Player from "../../model/Player";
const express = require("express");

module.exports = tableManager => {
  const router = express.Router();

  router.post("/joinTable/:tableId", (req, res) => {
    try {
      const tableId = req.params.tableId;
      const { user } = req.body;

      const targetTable = tableManager.getTable(tableId);

      if (!targetTable) {
        return res.status(404).json({
          success: false,
          message: "해당 테이블은 존재하지 않습니다.",
        });
      }

      if (targetTable.isFull()) {
        return res
          .status(400)
          .json({ success: false, message: "테이블이 꽉 찼습니다." });
      }

      const newPlayer = new Player(user);
      targetTable.addPlayer(newPlayer);

      res.status(200).json({
        success: true,
        message: "방에 입장하였습니다.",
      });
    } catch (err) {
      console.error("Error while creating table socket:", err);
      res.status(500).json({ success: false, message: "socket error" });
    }
  });

  return router;
};
