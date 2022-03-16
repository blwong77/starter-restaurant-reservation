function checkTime(req, res, next) {
  const time = req.body.data.reservation_time;

  if (time && time.match(/([0-1][0-9]|2[0-3]):([0-5][0-9])/)) {
    res.locals.reservationData.reservation_time = time;
    return next();
  }
  next({ status: 400, message: "reservation_time is required" });
}

module.exports = checkTime;
