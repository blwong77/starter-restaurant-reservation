const service = require("./reservations.service");

/**
 * Validation Imports
 */
const checkData = require("../common/validation/checkData");
const checkReservation = require("./validation/checkReservation");
const checkFirstName = require("./validation/checkFirstName");
const checkLastName = require("./validation/checkLastName");
const checkMobileNumber = require("./validation/checkMobileNumber");
const checkPeople = require("./validation/checkPeople");
const checkTime = require("./validation/checkTime");
const checkDate = require("./validation/checkDate");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  let date = req.query.date;
  if (!date) date = new Date().toISOString().slice(0, 10);

  const data = await service.getReservationsByDate(date);
  res.json({
    data,
  });
}

async function read(req, res) {
  res.status(200).json({ data: res.locals.reservation });
}

async function create(req, res) {
  const reservationData = res.locals.reservationData;

  const newReservation = await service.createReservation(reservationData);
  res.status(201).json({ data: newReservation });
}

module.exports = {
  list,
  read: [checkReservation, read],
  create: [
    checkData,
    checkFirstName,
    checkLastName,
    checkMobileNumber,
    checkPeople,
    checkDate,
    checkTime,
    create
  ],
};
