const knex = require("../db/connection");

const table = "reservations";

function getReservationsByDate(date) {
  return knex(table)
    .select(
      "reservation_id",
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time",
      "people"
    )
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

function createReservation(reservation) {
  return knex(table)
    .insert(reservation)
    .returning("*")
    .then((res) => res[0]);
}

function readReservation(reservation_id) {
  return knex("reservations").where({reservation_id}).first();
}

module.exports = {
  getReservationsByDate,
  createReservation,
  readReservation,
};
