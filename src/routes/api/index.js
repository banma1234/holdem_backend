const express = require("express");
const createTableRoutes = require("./createTable");
const joinTableRoutes = require("./joinTable");

function apiRoutes(app, tableManager) {
  app.use("/api", createTableRoutes(tableManager));
  app.use("/api", joinTableRoutes(tableManager));
}

module.exports = { apiRoutes };
