const express = require('express');
const createTableRoutes = require('./createTable');
const joinTableRoutes = require('./joinTable');

function apiRoutes(app, tableManager, io) {
    app.use('/api', createTableRoutes(tableManager));
    app.use('/api', joinTableRoutes(tableManager, io));
}

module.exports = { apiRoutes };
