const router = require("express").Router();
const connection = require("../config/db");

router.route("/getAllInfo").get(async (req, res) => {
  try {
    await connection.query(`select * from building`, function (error, result) {
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

router.route("/getInfo/:buildingID").get(async (req, res) => {
  const buildingID = Number(req.params.buildingID);
  try {
    await connection.query(
      `select * from building where buildingID=${buildingID}`,
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

router.route("/insertInfo").post(async (req, res) => {
  const {
    building_name,
    total_floors,
    flats_each,
    building_street,
    building_pincode,
  } = req.body;
  try {
    await connection.query(
      `insert into building(building_name, total_floors, flats_each, building_street, building_pincode) values("${building_name}", ${total_floors}, ${flats_each}, "${building_street}", "${building_pincode}")`,
      function (error, result) {
        if (error)
          return res.status(500).json({ result: error.message, error: true });
        return res
          .status(200)
          .json({ result: "Data inserted into building !", error: false });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ result: error.message, error: true });
  }
});

module.exports = router;
