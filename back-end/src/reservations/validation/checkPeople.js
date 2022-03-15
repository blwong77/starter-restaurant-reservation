function checkPeople(req, res, next) {
  const people = req.body.data.people;

  if (people && Number(people) > 0) {
    res.locals.reservationData.people = Number(people);
    return next();
  }
  next({ status: 400, message: "People are required" });
}

module.exports = checkPeople;
