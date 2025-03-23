const express = require("express");

module.exports = tableManager => {
  const router = express.Router();

  router.post("/createTable/:tableId", (req, res) => {
    try {
      const tableId = req.params.tableId;
      const { user } = req.body;

      if (!tableId || !user.id || !user.nickname) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields." });
      }

      if (tableManager.getTable(tableId)) {
        return res
          .status(409)
          .json({ success: false, message: "해당 방은 이미 존재합니다." });
      }

      tableManager.createTable(tableId, user);

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
