const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connection = require("./config/db");

const auth = require("./routes/auth");
const owner = require("./routes/owner");
const tenant = require("./routes/tenant");
const payment = require("./routes/payment");
const building = require("./routes/building");
const flat = require("./routes/flat");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", auth);
app.use("/owner", owner);
app.use("/tenant", tenant);
app.use("/payment", payment);
app.use("/building", building);
app.use("/flat", flat);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
