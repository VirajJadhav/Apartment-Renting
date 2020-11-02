const router = require("express").Router();
const connection = require("../config/db");
const bcrypt = require("bcrypt");

router.route("/").get(async (req, res) => {
  await res.send("Welcome");
});

async function compareHashedPassword(dbpassword, password) {
  try {
    const compared = await bcrypt.compare(dbpassword, password);
    return compared;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

async function returnHashedPassowrd(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error.message);
    return password;
  }
}

router.route("/login").post(async (req, res) => {
  const { user_email, user_password } = req.body;
  try {
    await connection.query(
      `select * from user where user_email="${user_email}"`,
      function (error, result) {
        if (error)
          return res.status(500).json({ result: error.message, error: true });
        let data = result;
        if (data.length === 1) {
          compareHashedPassword(String(user_password), data[0].user_password)
            .then((compareResult) => {
              if (compareResult) {
                return res.status(200).json({ result: data[0], error: false });
              } else {
                return res
                  .status(200)
                  .json({ result: "Invalid password !", error: true });
              }
            })
            .catch((error) => console.log(error));
        } else
          return res
            .status(200)
            .json({ result: "User not registered !", error: true });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ result: error.message, error: true });
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
          return res.status(500).json({ result: error.message, error: true });
        let data = result,
          typeTable = "";
        if (data.length === 0) {
          returnHashedPassowrd(user_password)
            .then((hashed_password) => {
              connection.query(
                `insert into user values("${user_email}", "${hashed_password}", "${user_type}")`,
                function (error, result) {
                  if (error)
                    return res
                      .status(500)
                      .json({ result: error.message, error: true });
                }
              );
              typeTable = user_type === "O" ? "owner" : "tenant";
              connection.query(
                `insert into ${typeTable} values("${user_email}", "${user_name}", "${user_contact}", "${user_address}", "${user_pincode}")`,
                function (error, result) {
                  if (error)
                    return res
                      .status(500)
                      .json({ result: error.message, error: true });
                }
              );
            })
            .catch((error) => console.log(error));
          return res
            .status(200)
            .json({ result: "User registered !", error: false });
        } else {
          return res.status(200).json({
            result: "User with this email already exists !",
            error: true,
          });
        }
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ result: error.message, error: true });
  }
});

module.exports = router;
