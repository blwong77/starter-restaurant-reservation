function checkStatus(req, res, next) {
  const validStatus = ["booked", "seated", "finished"];
  const { status } = req.body.data;

  if(validStatus.includes(status)) {
    return next();
  }
  next({status: 400, message: `Status must be "booked", "seated", or "finished". Not ${status}`})
}

module.exports = checkStatus;