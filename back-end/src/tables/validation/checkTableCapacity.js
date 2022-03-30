function checkTableCapacity(req, res, next) {
  const { capacity } = res.locals.table;
  const { people } = res.locals.reservation;

  if (people <= capacity) {
    return next();
  }
  next({ status: 400, message: "Table capacity is too small for this party." });
}

module.exports = checkTableCapacity;
