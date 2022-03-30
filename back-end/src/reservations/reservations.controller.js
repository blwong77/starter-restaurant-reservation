const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

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
const checkBooked = require("./validation/checkBooked");
const checkStatus = require("./validation/checkStatus");
const checkFinished = require("./validation/checkFinished");

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
  const data = await service.createReservation(res.locals.reservationData);
  res.status(201).json({ data });
}

async function updateStatus(req, res) {
  const { reservation_id } = req.params;
  const updatedReservation = { ...req.body.data, reservation_id };
  const data = await service.updateStatus(updatedReservation);

  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [checkReservation, read],
  create: [
    checkData,
    checkFirstName,
    checkLastName,
    checkMobileNumber,
    checkPeople,
    checkDate,
    checkTime,
    checkBooked,
    create,
  ],
  updateStatus: [checkReservation, checkStatus, checkFinished, updateStatus],
};
