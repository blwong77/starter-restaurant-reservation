const knex = require("../db/connection");

const table = "tables";

function getTables() {
  return knex(table).select("*").orderBy("table_name");
}

function getTable(table_id) {
  return knex(table).where({ table_id }).first();
}

function createTable(newTable) {
  return knex(table)
    .insert(newTable)
    .returning("*")
    .then((res) => res[0]);
}

function updateTable(updatedTable) {
  return knex(table)
    .update(updatedTable, "*")
    .where({ table_id: updatedTable.table_id });
}

module.exports = {
  getTable,
  getTables,
  createTable,
  updateTable,
};
