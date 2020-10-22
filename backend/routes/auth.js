const router = require("express").Router();
const connection = require("../config/db");

router.route("/").get(async (req, res) => {
  await res.send("Welcome");
});

router.route("/login").post(async (req, res) => {
  const { user_email, user_password } = req.body;
  try {
    await connection.query(
      `select * from user where user_email="${user_email}"`,
      function (error, result) {
        if (error)
          return res.status(400).json({ result: error.message, error: true });
        let data = [];
        data = result;
        if (data.length === 1) {
          if (user_password === data[0].user_password)
            return res.status(200).json({ result: data[0], error: false });
          else
            return res
              .status(200)
              .json({ result: "Invalid password !", error: false });
        } else
          return res
            .status(200)
            .json({ result: "User not registered !", error: true });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(400);
  }
});

router.route("/signup").post(async (req, res) => {
  const {
    user_email,
    user_password,
    user_type,
    user_contact,
    user_pincode,
    user_address,
    user_name,
  } = req.body;
  try {
    await connection.query(
      `select * from user where user_email="${user_email}"`,
      function (error, result) {
        if (error)
          return res.status(400).json({ result: error.message, error: true });
        let data = [],
          typeTable = "";
        data = result;
        if (data.length === 0) {
          connection.query(
            `insert into user values("${user_email}", "${user_password}", "${user_type}")`,
            function (error, result) {
              if (error)
                return res
                  .status(400)
                  .json({ result: error.message, error: true });
            }
          );
          typeTable = user_type === "O" ? "owner" : "tenant";
          connection.query(
            `insert into ${typeTable} values("${user_email}", "${user_name}", "${user_contact}", "${user_address}", "${user_pincode}")`,
            function (error, result) {
              if (error)
                return res
                  .status(400)
                  .json({ result: error.message, error: true });
            }
          );
          return res
            .status(200)
            .json({ result: "User registered !", error: false });
        } else {
          return res.status(200).json({
            result: "User with this email already exits !",
            error: true,
          });
        }
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(400);
  }
});

module.exports = router;
