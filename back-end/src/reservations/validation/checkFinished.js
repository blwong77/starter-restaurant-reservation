function checkFinished(req, res, next) {
  if(res.locals.reservation.status !== "finished") {
    return next()
  }
  next({status: 400, message: "Cannot update 'finished' reservations."})
}

module.exports = checkFinished;