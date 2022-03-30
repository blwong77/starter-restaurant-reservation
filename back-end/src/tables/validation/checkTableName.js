function checkTableName(req, res, next) {
  const tableName = req.body.data.table_name;

  if (tableName) {
    if (tableName.length > 1) {
      res.locals.table_name = tableName;
      return next();
    }
  }
  next({
    status: 400,
    message: "table_name is must be 2 characters or longer.",
  });
}

module.exports = checkTableName;
