const mysql = require("mysql");

const Tables = require("./table");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ApartmentRent", // line to comment and uncomment according to readme file
  multipleStatements: true,
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("Connected to database !");
});

// function to comment and uncomment according to readme file (create database query lines)
// connection.query("CREATE DATABASE IF NOT EXISTS ApartmentRent", function (
//   error,
//   result
// ) {
//   if (error) throw error;
//   console.log("Database created !");
// });

// connection.query(Tables.user, function (error, result) {
//   if (error) throw error;
//   console.log("User table created !");
// });

// connection.query(Tables.owner, function (error, result) {
//   if (error) throw error;
//   console.log("Owner table created !");
// });

// connection.query(Tables.tenant, function (error, result) {
//   if (error) throw error;
//   console.log("Tenant table created !");
// });

// connection.query(Tables.building, function (error, result) {
//   if (error) throw error;
//   console.log("Building table created !");
// });

// connection.query(Tables.flats, function (error, result) {
//   if (error) throw error;
//   console.log("Flats table created !");
// });

// connection.query(Tables.payment, function (error, result) {
//   if (error) throw error;
//   console.log("Payment table created !");
// });

module.exports = connection;
