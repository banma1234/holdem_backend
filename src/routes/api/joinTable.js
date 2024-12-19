import Player from "../../model/Player";
const express = require("express");

module.exports = (tableManager, io) => {
  const router = express.Router();

  router.post("/joinTable/:tableId", (req, res) => {
    try {
      const tableId = req.params.tableId;
      const { user } = req.body;

      const targetTable = tableManager.getTable(tableId);

      if (!targetTable) {
        return res.status(404).json({ success: false, message: '해당 테이블은 존재하지 않습니다.' });
      }

      if (targetTable.isFull()) {
        return res.status(400).json({ success: false, message: '테이블이 꽉 찼습니다.' });
      }

      const newUser = new Player(user);
      const MASTER = targetTable.getMasterInfo();
      targetTable.addPlayer(newUser);

      io.of('/table').to(tableId).emit('update_players', user);
      console.log(`${user.nickname} 님이 입장하셨습니다.`);

      res.status(200).json({ success: true, message: `${MASTER.nickname} 님의 방에 입장하였습니다.` });
    } catch (err) {
      console.error("Error while creating table socket:", err);
      res
        .status(500)
        .json({ success: false, message: "socket error" });
    }
  });

  return router;
};
