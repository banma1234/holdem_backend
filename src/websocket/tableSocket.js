const setupTableSocket = (io, tableManager) => {
  const tableNamespace = io.of("/table");

  tableNamespace.on("connection", socket => {
    console.log("유저가 테이블에 접속합니다 : ", socket.id);

    socket.on("join_table", ({ tableId, playerId }, callback) => {
      const table = tableManager.getTable(tableId);
      const player = table.getPlayerById(playerId);

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
        .emit("update_players", player);

      tableNamespace
        .to(tableId)
        .emit("system_message", {
          message: `${player.nickname}님이 인생을 낭비하러 오셨습니다.`,
        });
    });

    socket.on("disconnect", ({ tableId, playerId }) => {
      console.log("유저가 테이블을 떠납니다");
      const table = tableManager.getTable(tableId);
      const player = table.getPlayerById(playerId);
      
      if (table.isEmpty()) {
        tableManager.removeTable(table.tableId);
        console.log(
          `남은 유저가 없으므로 테이블을 제거합니다 : ${table.tableId}`,
        );
      }

      const removed = table.isPlayerExist(playerId);
      if (removed) {
        tableNamespace
          .to(table.tableId)
          .emit("update_players", table.getPlayerById(playerId));

        table.removePlayerById(playerId);
        if (table.isEmpty()) {
          console.log(`남은 플레이어가 없으므로 해당 테이블을 제거합니다 : ${table.tableId}`);
          tableManager.removeTable(table.tableId);
        }

        tableNamespace
          .to(tableId)
          .emit("system_message", {
            message: `${player.nickname}님이 인생을 낭비하러 오셨습니다.`,
          });
      }
    });

    socket.on("chat_message", ({ tableId, nickname, message }) => {
      if (!tableManager.getTable(tableId))  return;

      // Broadcast the chat message to all players in the table
      tableNamespace
        .to(tableId)
        .emit("chat_message", {
          nickname,
          message,
        });
    });
  });
};

module.exports = setupTableSocket;
