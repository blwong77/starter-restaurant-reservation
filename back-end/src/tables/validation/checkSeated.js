function checkSeated(req, res, next) {
  if (res.locals.reservation.status !== "seated") {
    return next();
  }
  next({ status: 400, message: "Reservation is already seated." });
}

module.exports = checkSeated;