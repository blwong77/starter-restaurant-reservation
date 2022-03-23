function checkDate(req, res, next) {
  const date = req.body.data.reservation_date;

  if (date) {
    const reservationDate = new Date(date);
    const currentDate = new Date();
    if (reservationDate.getUTCDay() === 2) {
      return next({
        status: 400,
        message: "The restaurant is closed on Tuesdays.",
      });
    }
    if (
      reservationDate.getUTCFullYear() < currentDate.getUTCFullYear &&
      reservationDate.getUTCMonth() < currentDate.getUTCMonth() &&
      reservationDate.getUTCDate() < currentDate.getUTCDate()
    ) {
      console.log(reservationDate, currentDate);
      return next({
        status: 400,
        message: "Please make a reservation for today or a future date.",
      });
    }
    if (String(new Date(date)) !== "Invalid Date") {
      res.locals.reservationData.reservation_date = date;
      return next();
    }
  }

  next({ status: 400, message: "reservation_date is required" });
}

module.exports = checkDate;
