const service = require("../tables.service");

async function checkTable(req, res, next) {
  const { table_id } = req.params;
  const table = await service.getTable(table_id);

  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: `Table #${table_id} does not exist.` });
}

module.exports = checkTable;
