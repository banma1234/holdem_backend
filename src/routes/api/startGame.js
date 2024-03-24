import tableManager from "../../game/TableManager";
const express = require("express");
const router = express.Router();

module.exports = function () {
  router.post("/start", (req, res) => {
    try {
      const { tableId } = req.body;

      const targetTable = tableManager.getTable(tableId);
      targetTable.startGame();

      res
        .status(200)
        .json({ success: true, message: "게임이 시작되었습니다." });
    } catch (err) {
      console.error("Error while creating table socket:", err);
      res
        .status(500)
        .json({ success: false, message: "게임 시작에 실패하였습니다." });
    }
  });

  return router;
};
