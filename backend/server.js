const express = require("express")
const cors = require("cors")

const app = express()

const port = process.env.PORT || 5000

app.use(express.json({ limit: "50mb" }))
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => res.send("Welcome !"))

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})