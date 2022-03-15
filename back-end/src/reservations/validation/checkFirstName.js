function checkFirstName(req, res, next) {
  const firstName = req.body.data.first_name;

  if (firstName) {
    res.locals.reservationData = {};
    res.locals.reservationData.first_name = firstName;
    return next();
  }
  next({ status: 400, message: "First name is required" });
}

module.exports = checkFirstName;
