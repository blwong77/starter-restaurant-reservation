const service = require("./reservations.service");

/**
 * Validation Imports
 */
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
  const data = await service.getAllReservations()
  res.json({
    data,
  });
}

async function create(req, res) {
  const reservationData = res.locals.reservationData;
  console.log(reservationData);
  const newReservation = await service.createReservation(reservationData);
  res.status(201).json({data: newReservation});
}

module.exports = {
  list,
  create: [
    checkFirstName,
    checkLastName,
    checkMobileNumber,
    checkPeople,
    checkTime,
    checkDate,
    create,
  ],
};
