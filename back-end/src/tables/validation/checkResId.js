function checkResId(req, res, next) {
  const { reservation_id } = req.body.data;

  if (reservation_id) {
    return next();
  }
  next({ status: 400, message: "A reservation_id property is required." });
}

module.exports = checkResId;
