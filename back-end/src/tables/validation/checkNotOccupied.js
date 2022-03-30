function checkNotOccupied(req, res, next) {
  if (res.locals.table.reservation_id) {
    return next();
  }
  next({ status: 400, message: "Table is not occupied." });
}

module.exports = checkNotOccupied;
