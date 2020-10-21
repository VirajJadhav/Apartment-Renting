const mysql = require("mysql")

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    multipleStatements: true
})

connection.connect(function(error) {
    if (error) throw error;
    console.log("Connected to database !")
})

connection.query("CREATE DATABASE IF NOT EXISTS ApartmentRent", function(error, result) {
    if(error) throw error;
    console.log("Database created !");
})


module.exports = connection;