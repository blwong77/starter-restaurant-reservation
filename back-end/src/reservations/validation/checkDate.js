function checkDate(req, res, next) {
  const date = req.body.data.reservation_date;
  if (date) {
    const reservationDate = new Date(`${date}T00:00:00-0700`);
    if (reservationDate.getUTCDay() === 2) {
      return next({
        status: 400,
        message: "The restaurant is closed on Tuesdays.",
      });
    }
    if (isPast(reservationDate)) {
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

function isPast(resDate) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return resDate < currentDate;
}

module.exports = checkDate;
