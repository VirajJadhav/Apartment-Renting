const router = require("express").Router();
const connection = require("../config/db");

router.route("/getOwnerBuildingInfo/:email").get(async (req, res) => {
  const tenant_email = req.params.email;
  try {
    await connection.query(
      `select flats.owner_email, flats.buildingID, flats.start_date, flats.floor_number, flats.flat_number, payment.paid, payment.due_date, payment.rent_amount from flats inner join payment on flats.flatID = payment.flatID and flats.buildingID = payment.buildingID where flats.tenant_email = "${tenant_email}"`,
      function (error, result) {
        if (error)
          return res.status(500).json({ result: error.message, error: true });
        let data = result.length === 0 ? [] : result;
        return res.status(200).json({ result: data, error: false });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ result: error.message, error: true });
  }
});

router.route("/getAllInfo").get(async (req, res) => {
  try {
    await connection.query(`select * from tenant`, function (error, result) {
      if (error)
        return res.status(500).json({ result: error.message, error: true });
      let data = result.length === 0 ? [] : result;
      return res.status(200).json({ result: data, error: false });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ result: error.message, error: true });
  }
});

router.route("/getTenantInfo/:email").get(async (req, res) => {
  const tenant_email = req.params.email;
  try {
    await connection.query(
      `select * from tenant where tenant_email="${tenant_email}"`,
      function (error, result) {
        if (error)
          return res.status(500).json({ result: error.message, error: true });
        let data = result.length === 0 ? [] : result[0];
        return res.status(200).json({ result: data, error: false });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ result: error.message, error: true });
  }
});

module.exports = router;
