import tableManager from "../../game/TableManager";
import User from "../../model/User";
const express = require("express");
const router = express.Router();

module.exports = function (io) {
  router.post("/game", (req, res) => {
    try {
      const { user, tableId } = req.body;

      const targetTable = tableManager.getTable(tableId);
      if (targetTable) {
        const newUser = new User(user);
        targetTable.addPlayer(newUser);
      }

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
