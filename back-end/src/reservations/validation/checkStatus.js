function checkStatus(req, res, next) {
  const validStatus = ["booked", "seated", "finished", "cancelled"];
  const { status } = req.body.data;

  if(validStatus.includes(status)) {
    return next();
  }
  next({status: 400, message: `Status must be "booked", "seated", "finished" or "cancelled". Not ${status}`})
}

module.exports = checkStatus;