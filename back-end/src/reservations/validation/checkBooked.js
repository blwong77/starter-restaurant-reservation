function checkBooked(req, res, next) {
  const { status } = req.body.data;

  if(!status || status === "booked") {
    return next()
  }
  next({ status: 400, message: `New reservations must have status: 'booked', not ${status}.`})
}

module.exports = checkBooked;