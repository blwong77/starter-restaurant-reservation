function checkTime(req, res, next) {
  const time = req.body.data.reservation_time;

  if (time) {
    res.locals.reservationData.reservation_time = time;
    return next();
  }
  next({ status: 400, message: "Time is required" });
}

module.exports = checkTime;
