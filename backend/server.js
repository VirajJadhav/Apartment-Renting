const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const connection = require("./config/db");

const auth = require("./routes/auth");

const app = express();

const port = process.env.PORT || 5000

app.use(express.json({ limit: "50mb" }))
app.use(cors())
app.use(express.urlencoded({ extended: true }))


app.use("/auth", auth);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})