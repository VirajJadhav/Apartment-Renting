const router = require("express").Router();
const connection = require("../config/db");

router.route("/").get(async (req, res) => {
    await res.send("Welcome");
})

module.exports = router;