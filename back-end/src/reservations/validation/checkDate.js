function checkDate(req, res, next) {
  const date = req.body.data.reservation_date;

  if (date && String(new Date(date)) !== "Invalid Date") {
    res.locals.reservationData.reservation_date = date;
    return next();
  }
  next({ status: 400, message: "reservation_date is required" });
}

module.exports = checkDate;
