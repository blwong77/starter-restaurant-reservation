exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary();
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.string("mobileNumber").notNullable();
    table.string("reservationDate").notNullable();
    table.string("reservationTime").notNullable();
    table.integer("people").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
