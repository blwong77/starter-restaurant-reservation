function checkTime(req, res, next) {
  const time = req.body.data.reservation_time;

  if (time && time.match(/([0-1][0-9]|2[0-3]):([0-5][0-9])/)) {
    const resDate = new Date(res.locals.reservationData.reservation_date)
    const hours = time.slice(0, 2);
    const minutes = time.slice(3);

    if (hours < 10 || hours > 21) {
      return next({
        status: 400,
        message: "The restaurant is closed during that time.",
      });
    } else if (
      (hours === "10" && minutes < 30) ||
      (hours === "21" && minutes > 30)
    ) {
      return next({
        status: 400,
        message: "The restaurant is closed during that time.",
      });
    }

    if (isToday(resDate)) {
      const currentTime = new Date();
      const currentHours = currentTime.slice(0, 2);
      const currentMinutes = currentTime.slice(3);
      if (
        (hours < currentHours) ||
        (hours === currentHours && minutes < currentMinutes)
      ) {
        return next({
          status: 400,
          message: "Please place a reservation for a future time.",
        });
      }
    }
    res.locals.reservationData.reservation_time = time;
    return next();
  }
  next({ status: 400, message: "reservation_time is required" });
}

function isToday(date) {
  const today = new Date();

  return (
    date.getUTCDate() === today.getUTCDate() &&
    date.getUTCMonth() === today.getUTCMonth() &&
    date.getUTCFullYear() === today.getUTCFullYear()
  );
}

module.exports = checkTime;
