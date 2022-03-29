function checkCapacity(req, res, next) {
  const capacity  = req.body.data.capacity;
  if (capacity) {
    if(typeof capacity !== "number") {
      return next({status: 400, message: "capacity must be a valid number"})
    }
    if (capacity > 0) {
      res.locals.capacity = capacity;
      return next();
    }
  }
  next({ status: 400, message: "capacity must be a number greater than 0." });
}

module.exports = checkCapacity;