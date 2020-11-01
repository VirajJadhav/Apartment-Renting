# Apartment Renting System

This is a mini project build on mysql, express, react, nodejs (just to be familar with mysql connection and handling sql queries with express nodejs as backend and react for frontend along with mysql as our database).

This project is based on aparment renting system between owner and tenant, where in owner can lease his / her apartment to tenant on fixed rent with decided period.

## This project has mainly two views apart from login and signup view

1. Owner:
   1. Owner will be able to fill building information - ranging from total floors and rough figure of number of flats on each floor.
   1. Owner will be able to assign flats / apartment to the desired tenant (registered on site).
   1. Owner will decide total rent amount, deadline, start date, etc.
   1. Owner will be able to update rent amount, deadline, and even remove tenants from his / her list once the tenant wishes to leave.
1. Tenant:
   1. Once assigned a apartment, tenant will be able to view all necessary information about owner and building.

## To run this project

**Requirements:**

1. mysql installed.
1. nodejs and npm / yarn installed. (any LTS version of nodejs will do, preferably >= v10)

**Steps (Make sure mysql is running on your system and installed LTS nodejs and npm / yarn version) :**

1. To download frontend and backend dependencies:
   1. cd into root project folder (where all src, public backend folder is present). //change directory
   1. run "npm install". //all project dependencies will be installed.
1. To create database (side by side check db.js commented messages):
   1. cd into backend/config. //Change directory
   1. uncomment create database query lines and comment single line in the createConnection function = "database: "ApartmentRent""
   1. run "node db.js". //Database will be created.
   1. uncomment rest of the queries along with commented single line for createConnection in step 2.
   1. run "node db.js". //Required tables will be created.
   1. Once database and tables are created you can comment those database and table creation queries apart from connect function query and single line in createConnection function = "database: "ApartmentRent"" // Not a compusory step. And can skip if you would like.
1. To start project:
   1. Just frontend:
      1. run "npm start".
   1. Just backend:
      1. run "npm run server".
   1. Both backend and frontend together: // recommended
      1. run "npm run dev".
         // if it results into nodemon / concurrently error - run "npm install nodemon concurrently --save".
