const knex = require("../db/connection");

const table = "reservations"

function getAllReservations() {
  return knex(table)
    .select(
      "reservation_id",
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time",
      "people"
    );
}

function createReservation(reservation) {
  return knex(table)
    .insert(reservation)
    .returning("*")
    .then((res) => res[0]);
}

module.exports = {
  getAllReservations,
  createReservation,
};
