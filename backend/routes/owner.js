const router = require("express").Router();
const connection = require("../config/db");

router.route("/getFlatPaymentDetails/:email").get(async (req, res) => {
  const owner_email = req.params.email;
  try {
    await connection.query(
      `select * from flats inner join payment on flats.flatID = payment.flatID and flats.buildingID = payment.buildingID where flats.owner_email="${owner_email}"`,
      function (error, result) {
        if (error)
          return res.status(500).json({ result: error.message, error: true });
        let data = result;
        return res.status(200).json({ result: data, error: false });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ result: error.message, error: true });
  }
});

router.route("/getConnectedTenantInfo/:email").get(async (req, res) => {
  const owner_email = req.params.email;
  try {
    await connection.query(
      `select * from tenant where tenant_email in ( select tenant_email from flats where owner_email="${owner_email}" )`,
      function (error, result) {
        if (error)
          return res.status(500).json({ result: error.message, error: true });
        let data = result;
        return res.status(200).json({ result: data, error: false });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ result: error.message, error: true });
  }
});

router.route("/getOwnerTenantInfo/:email").get(async (req, res) => {
  const owner_email = req.params.email;
  try {
    await connection.query(
      `select * from flats where owner_email="${owner_email}"`,
      function (error, result) {
        if (error)
          return res.status(500).json({ result: error.message, error: true });
        let data = result;
        return res.status(200).json({ result: data, error: false });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ result: error.message, error: true });
  }
});

router.route("/getOwnerInfo/:email").get(async (req, res) => {
  const owner_email = req.params.email;
  try {
    await connection.query(
      `select * from owner where owner_email="${owner_email}"`,
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

router.route("/getOwnersInfos").post(async (req, res) => {
  const owner_email = req.body;
  const new_owner_email = new Array(owner_email.length).fill("?").join(",");
  try {
    await connection.query(
      `select * from owner where owner_email in (${new_owner_email})`,
      owner_email,
      function (error, result) {
        if (error)
          return res.status(500).json({ result: error.message, error: true });
        let data = result;
        return res.status(200).json({ result: data, error: false });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ result: error.message, error: true });
  }
});

module.exports = router;
