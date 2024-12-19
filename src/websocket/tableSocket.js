const setupTableSocket = (io, tableManager) => {
    const tableNamespace = io.of('/table');

    tableNamespace.on('connection', (socket) => {
        console.log('A user connected to table namespace:', socket.id);

        socket.on('join_table', ({ tableId, id }, callback) => {
            const table = tableManager.getTable(tableId);
            if (!table) {
                return callback({ success: false, message: 'Table not found.' });
            }

            socket.join(tableId);
            callback({ success: true });
            tableNamespace.to(tableId).emit('update_players', table.getPlayers());
        });

        socket.on('disconnect', () => {
            console.log('User disconnected from table namespace:', socket.id);
            for (const table of tableManager.getAllTables()) {
                const removed = table.removePlayerBySocketId(socket.id);
                if (removed) {
                    tableNamespace.to(table.tableId).emit('update_players', table.getPlayers());
                    if (table.isEmpty()) {
                        tableManager.removeTable(table.tableId);
                        console.log(`Table deleted: ${table.tableId}`);
                    }
                    break;
                }
            }
        });
    });
};

module.exports = setupTableSocket;