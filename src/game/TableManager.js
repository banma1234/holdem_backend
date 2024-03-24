import GameTable from "./GameTable";

class TableManager {
  constructor() {
    this.tables = new Map();
  }

  createTable(tableSocket, gameSocket, tableId) {
    const table = new GameTable(tableSocket, gameSocket, tableId);
    this.tables.set(tableId, table);

    return table;
  }

  removeTable(tableId) {
    this.tables.delete(tableId);
  }

  getTable(tableId) {
    return this.tables.get(tableId);
  }

  getTableSize() {
    return this.tables.size();
  }

  getAllTables() {
    return Array.from(this.tables.values());
  }
}

const tableManager = new TableManager();
export default tableManager;
