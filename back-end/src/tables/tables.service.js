const knex = require("../db/connection");

const table = "tables";

function getTables() {
  return knex(table).select("*").orderBy("table_name");
}

function createTable(newTable) {
  return knex(table)
    .insert(newTable)
    .returning("*")
    .then((res) => res[0]);
}

module.exports = {
  getTables,
  createTable,
};
