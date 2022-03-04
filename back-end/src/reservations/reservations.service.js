const knex = require("../db/connection");

function createReservation(reservation) {
  return knex("reservations").insert(reservation);
}