const service = require("../../reservations/reservations.service");

async function checkReservation(req, res, next) {
  const { reservation_id } = req.body.data;
  const reservation = await service.readReservation(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation #${reservation_id} does not exist.`,
  });
}

module.exports = checkReservation;