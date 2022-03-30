const knex = require("../db/connection");

const table = "reservations";

function getReservationsByDate(date) {
  return knex(table)
    .select("*")
    .where({ reservation_date: date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");
}

function createReservation(reservation) {
  return knex(table)
    .insert(reservation)
    .returning("*")
    .then((res) => res[0]);
}

function readReservation(reservation_id) {
  return knex(table).where({ reservation_id }).first();
}

function updateReservation(reservation) {
  return knex(table)
    .where({ reservation_id: reservation.reservation_id })
    .update(reservation, "*");
}

function updateStatus(reservation) {
  return knex(table)
    .where({ reservation_id: reservation.reservation_id })
    .update({ status: reservation.status }, "*")
    .then((res) => res[0]);
}

module.exports = {
  getReservationsByDate,
  createReservation,
  readReservation,
  updateReservation,
  updateStatus,
};
