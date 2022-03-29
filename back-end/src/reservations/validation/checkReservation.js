const service = require("../reservations.service");

async function checkReservation(req, res, next) {
  const {reservation_id} = req.params;
  const reservation = await service.readReservation(reservation_id);

  if(reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({status: 404, message: "reservation doesn't exist."})
}

module.exports = checkReservation;