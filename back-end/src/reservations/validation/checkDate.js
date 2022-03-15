function checkDate(req, res, next) {
  const date = req.body.data.reservation_date;

  if (date) {
    res.locals.reservationData.reservation_date = date;
    return next();
  }
  next({ status: 400, message: "Date is required" });
}

module.exports = checkDate;
