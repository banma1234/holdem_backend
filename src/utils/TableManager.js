import Player from "../model/Player";
import GameTable from "../model/GameTable";

class TableManager {
  constructor() {
    this.TABLE = new Map();
  }

  createTable(tableId, user) {
    if (this.TABLE.has(tableId)) {
      throw new Error("테이블이 이미 존재합니다.");
    }

    const master = new Player(user);
    const table = new GameTable(tableId, master);
    this.TABLE.set(tableId, table);
    return table;
  }

  removeTable(tableId) {
    this.TABLE.delete(tableId);
  }

  getTable(tableId) {
    return this.TABLE.get(tableId);
  }

  getAllTables() {
    return Array.from(this.TABLE.values());
  }
}

module.exports = TableManager;
