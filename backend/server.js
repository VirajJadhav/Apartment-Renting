const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express()

const port = process.env.PORT || 5000

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    // database: "new_db"
})

connection.connect(function(err) {
    if(err) throw err;
    console.log("Connected to database !");
    connection.query("CREATE DATABASE IF NOT EXISTS ApartmentRent", function(err, res) {
        if (err) throw err;
        console.log("Database created");
    })
})

app.use(express.json({ limit: "50mb" }))
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => res.send("Welcome !"))

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})