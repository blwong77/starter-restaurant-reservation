const service = require("./tables.service");
const reservationService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

/**
 * Validation Imports
 */
const checkData = require("../common/validation/checkData");
const checkReservation = require("./validation/checkReservation");
const checkCapacity = require("./validation/checkCapacity");
const checkTableName = require("./validation/checkTableName");
const checkTable = require("./validation/checkTable");
const checkSeated = require("./validation/checkSeated");
const checkOccupied = require("./validation/checkOccupied");
const checkTableCapacity = require("./validation/checkTableCapacity");
const checkResId = require("./validation/checkResId");
const checkNotOccupied = require("./validation/checkNotOccupied");

async function list(req, res) {
  const data = await service.getTables();

  res.json({ data });
}

async function create(req, res) {
  const newTable = {
    table_name: res.locals.table_name,
    capacity: res.locals.capacity,
    reservation_id: req.body.data.reservation_id,
  };

  const data = await service.createTable(newTable);

  res.status(201).json({ data });
}

function read(req, res) {
  res.status(200).json({ data: res.locals.table });
}

async function update(req, res) {
  const { table, reservation } = res.locals;
  table.reservation_id = reservation.reservation_id;
  table.status = "occupied";
  reservation.status = "seated";

  const updatedTable = await service.updateTable(table);
  const updatedReservation = await reservationService.updateReservation(
    reservation
  );
  res.status(200).json({ data: [updatedTable, updatedReservation] });
}

async function finishTable(req, res) {
  const { table } = res.locals;
  const reservation = await reservationService.readReservation(
    table.reservation_id
  );
  table.reservation_id = null;
  table.status = "free";
  reservation.status = "finished";

  const updatedTable = await service.updateTable(table);
  const updatedReservation = await reservationService.updateReservation(
    reservation
  );
  res.json({ data: [updatedTable, updatedReservation] });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    checkData,
    checkCapacity,
    checkTableName,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(checkTable), read],
  update: [
    checkData,
    checkResId,
    asyncErrorBoundary(checkReservation),
    asyncErrorBoundary(checkTable),
    checkSeated,
    checkOccupied,
    checkTableCapacity,
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(checkTable),
    checkNotOccupied,
    asyncErrorBoundary(finishTable),
  ],
};
