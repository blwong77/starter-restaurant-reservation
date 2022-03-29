const service = require("./tables.service");

/**
 * Validation Imports
 */
const checkData = require("./validation/checkData");
const checkCapacity = require("./validation/checkCapacity");
const checkTableName = require("./validation/checkTableName");

async function list(req, res) {
  const data = await service.getTables();

  res.json({ data });
}

async function create(req, res) {

  const newTable = {
    table_name: res.locals.table_name,
    capacity: res.locals.capacity,
  }

  const data = await service.createTable(newTable);

  res.status(201).json({ data });
}

module.exports = {
  list,
  create: [checkData, checkCapacity, checkTableName, create],
};
