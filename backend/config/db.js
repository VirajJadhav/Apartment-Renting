const mysql = require("mysql")

const tables = require("./table");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: "ApartmentRent",
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

connection.query(tables.user, function(error, result) {
    if(error) throw error;
    console.log("User table created !");
})

connection.query(tables.owner, function(error, result) {
    if(error) throw error;
    console.log("Owner table created !");
})

connection.query(tables.tenant, function(error, result) {
    if(error) throw error;
    console.log("Tenant table created !");
})

connection.query(tables.building, function(error, result) {
    if(error) throw error;
    console.log("Building table created !");
})

connection.query(tables.flats, function(error, result) {
    if(error) throw error;
    console.log("Flats table created !");
})

connection.query(tables.payment, function(error, result) {
    if(error) throw error;
    console.log("Payment table created !");
})

module.exports = connection;