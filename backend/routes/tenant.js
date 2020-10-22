const router = require("express").Router();
const connection = require("../config/db");

router.route("/getTenantInfo/:email").get(async (req, res) => {
  const tenant_email = req.params.email;
  try {
    await connection.query(
      `select * from tenant where tenant_email=${tenant_email}`,
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
