const router = require("express").Router();
const connection = require("../config/db");

router.route("/insertPayment").post(async (req, res) => {
  const { flatID, buildingID, paid, due_date, rent_amount } = req.body;
  try {
    await connection.query(
      `insert into payment(flatID, buildingID, paid, due_date, rent_amount) values(${flatID}, ${buildingID}, "${paid}", "${due_date}", ${rent_amount})`,
      function (error, result) {
        if (error)
          return res.status(500).json({ result: error.message, error: true });
        return res
          .status(200)
          .json({ result: "Data inserted into payment !", error: false });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ result: error.message, error: true });
  }
});

router.route("/getPaymentInfo/:flatID/:buildingID").get(async (req, res) => {
  const { flatID, buildingID } = req.params;
  try {
    await connection.query(
      `select * from payment where flatID=${flatID} and buildingID=${buildingID}`,
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

router.route("/updatePayment").post(async (req, res) => {
  const { paymentID, paid } = req.body;
  try {
    await connection.query(
      `update payment set paid="${paid}" where paymentID=${paymentID}`,
      function (error, result) {
        if (error)
          return res.status(500).json({ result: error.message, error: true });
        return res
          .status(200)
          .json({ result: "Payment status updated !", error: false });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ result: error.message, error: true });
  }
});

module.exports = router;
