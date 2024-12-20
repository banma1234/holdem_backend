const setupTableSocket = (io, tableManager) => {
  const tableNamespace = io.of("/table");

  tableNamespace.on("connection", socket => {
    console.log("유저가 테이블에 접속합니다 : ", socket.id);

    socket.on("join_table", ({ tableId, playerId }, callback) => {
      const table = tableManager.getTable(tableId);

      if (!table) {
        return callback({
          success: false,
          message: "테이블을 찾을 수 없습니다.",
        });
      }

      socket.join(tableId);
      callback({ success: true, message: "테이블에 연결되었습니다." });
      tableNamespace
        .to(tableId)
        .emit("update_players", table.getPlayerById(playerId));
    });

    socket.on("disconnect", () => {
      console.log("유저가 테이블을 떠납니다 : ", socket.id);
      for (const table of tableManager.getAllTables()) {
        const removed = table.removePlayerBySocketId(socket.id);

        if (removed) {
          tableNamespace
            .to(table.tableId)
            .emit("update_players", table.getPlayers());

          if (table.isEmpty()) {
            tableManager.removeTable(table.tableId);
            console.log(
              `남은 유저가 없으므로 테이블을 제거합니다 : ${table.tableId}`,
            );
          }

          break;
        }
      }
    });
  });
};

module.exports = setupTableSocket;
