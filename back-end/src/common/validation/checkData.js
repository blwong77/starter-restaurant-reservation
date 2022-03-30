function checkData(req, res, next) {
  if (req.body.data) return next();
  next({ status: 400, message: "data does not exist." });
}

module.exports = checkData;
