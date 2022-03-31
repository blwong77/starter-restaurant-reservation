const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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
const checkQuery = require("./validation/checkQuery");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.status(200).json({ data: res.locals.reservations });
}

async function read(req, res) {
  res.status(200).json({ data: res.locals.reservation });
}

async function create(req, res) {
  const data = await service.createReservation(res.locals.reservationData);
  res.status(201).json({ data });
}

async function update(req, res) {
  const { reservation_id } = res.locals.reservation;
  const updatedReservation = { ...req.body.data, reservation_id };
  const data = await service.updateReservation(updatedReservation);

  res.status(200).json({ data });
}

async function updateStatus(req, res) {
  const { reservation_id } = req.params;
  const updatedReservation = { ...req.body.data, reservation_id };
  const data = await service.updateStatus(updatedReservation);

  res.status(200).json({ data });
}

module.exports = {
  list: [checkQuery, asyncErrorBoundary(list)],
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
  update: [
    checkData,
    checkFirstName,
    checkLastName,
    checkMobileNumber,
    checkPeople,
    checkDate,
    checkTime,
    checkReservation,
    update,
  ],
  updateStatus: [checkReservation, checkStatus, checkFinished, updateStatus],
};
