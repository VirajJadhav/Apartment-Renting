const router = require("express").Router();
const connection = require("../config/db");

router.route("/deleteRentRelation").post(async (req, res) => {
  const flatID = req.body.flatID;
  try {
    await connection.query(
      `delete from flats where flatID=${flatID}`,
      function (error, result) {
        if (error)
          return res.status(500).json({ result: error.message, error: true });
        return res.status(200).json({
          result: "Rent relation between owner and tenant removed !",
          error: false,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ result: error.message, error: true });
  }
});

router.route("/getInfo/:flatID").get(async (req, res) => {
  const flatID = req.params.flatID;
  try {
    await connection.query(
      `select * from flats where flatID=${flatID}`,
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

router.route("/insertInfo").post(async (req, res) => {
  const {
    owner_email,
    tenant_email,
    buildingID,
    floor_number,
    flat_number,
    start_date,
    due_date,
    rent_amount,
  } = req.body;
  try {
    await connection.query(
      `insert into flats(owner_email, tenant_email, buildingID, floor_number, flat_number, start_date) values("${owner_email}", "${tenant_email}", ${buildingID}, ${floor_number}, ${flat_number}, "${start_date}")`,
      function (error, result) {
        if (error)
          return res.status(500).json({ result: error.message, error: true });
        const data = JSON.parse(JSON.stringify(result));
        const flatID = data["insertId"];
        connection.query(
          `insert into payment(flatID, buildingID, paid, due_date, rent_amount) values(${flatID}, ${buildingID}, 'N', "${due_date}", ${rent_amount})`,
          function (error, result) {
            if (error)
              return res
                .status(500)
                .json({ result: error.message, error: true });
          }
        );
        return res
          .status(200)
          .json({ result: "Data inserted into flats !", error: false });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ result: error.message, error: true });
  }
});

module.exports = router;
