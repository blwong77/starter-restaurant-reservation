function checkMobileNumber(req, res, next) {
  const mobileNumber = req.body.data.mobile_number;

  if (mobileNumber) {
    res.locals.reservationData.mobile_number = mobileNumber;
    return next();
  }
  next({ status: 400, message: "Mobile number is required" });
}

module.exports = checkMobileNumber;
