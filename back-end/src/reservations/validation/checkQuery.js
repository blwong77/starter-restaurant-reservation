const service = require("../reservations.service")

async function checkQuery(req, res, next) {
  const { date, mobile_number } = req.query;
  if(date) {
    res.locals.reservations = await service.getReservationsByDate(date);
    return next()
  } else if(mobile_number) {
    res.locals.reservations = await service.search(mobile_number);
    return next()
  }
  next({status:400, message: "No query specified"})
}

module.exports = checkQuery;