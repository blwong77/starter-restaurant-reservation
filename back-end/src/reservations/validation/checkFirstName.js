function checkFirstName(req, res, next) {
  const firstName = req.body.data.first_name;

  if (firstName) {
    res.locals.reservationData = {};
    res.locals.reservationData.first_name = firstName;
    return next();
  }
  next({ status: 400, message: "first_name is required" });
}

module.exports = checkFirstName;
