const service = require("./reservations.service")

/**
 * Validation Imports
 */
const checkFirstName = require("./validation/checkFirstName")
const checkLastName = require("./validation/checkLastName")

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({
    data: [],
  });
}

async function create(req, res) {
  const reservationData = res.locals.reservationData;
  console.log(reservationData)
  // await service.create(req.body.data);
}

module.exports = {
  list,
  create:[checkFirstName, checkLastName, create],
};
