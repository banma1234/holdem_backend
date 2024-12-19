const GameTable = require('./GameTable');

class TableManager {
    constructor() {
        this.TABLE = new Map();
    }

    createTable(tableCode) {
        if (this.TABLE.has(tableCode)) {
            throw new Error('Table already exists.');
        }

        const table = new GameTable(tableCode);
        this.TABLE.set(tableCode, table);
        return table;
    }

    removeTable(tableCode) {
        this.TABLE.delete(tableCode);
    }

    getTable(tableCode) {
        return this.TABLE.get(tableCode);
    }

    getAllTables() {
        return Array.from(this.TABLE.values());
    }

    getMasterInfo() {
      return this.TABLE.get(tableCode).master;
    }
}

module.exports = TableManager;
