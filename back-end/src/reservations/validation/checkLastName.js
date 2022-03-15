function checkLastName(req, res, next) {
  const lastName = req.body.data.last_name;

  if (lastName) {
    res.locals.reservationData.last_name = lastName;
    return next();
  }
  next({ status: 400, message: "Last name is required" });
}

module.exports = checkLastName;
