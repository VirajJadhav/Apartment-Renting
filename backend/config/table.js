const Tables = {
  user:
    "CREATE TABLE IF NOT EXISTS user ( user_email varchar(255) NOT NULL, user_password char(60), user_type char(1), primary key (user_email) )",
  owner:
    "CREATE TABLE IF NOT EXISTS owner ( owner_email varchar(255) NOT NULL, owner_name varchar(25), owner_contact varchar(10), owner_street varchar(255), owner_pincode varchar(6), PRIMARY KEY (owner_email), FOREIGN KEY (owner_email) REFERENCES user(user_email) ON DELETE CASCADE )",
  tenant:
    "CREATE TABLE IF NOT EXISTS tenant ( tenant_email varchar(255) NOT NULL, tenant_name varchar(25), tenant_contact varchar(10), tenant_street varchar(255), tenant_pincode varchar(6), PRIMARY KEY (tenant_email), FOREIGN KEY (tenant_email) REFERENCES user(user_email) ON DELETE CASCADE )",
  building:
    "CREATE TABLE IF NOT EXISTS building ( buildingID int AUTO_INCREMENT NOT NULL, building_name varchar(255), total_floors int, flats_each int, building_street varchar(255), building_pincode varchar(6), PRIMARY KEY (buildingID) )",
  flats:
    "CREATE TABLE IF NOT EXISTS flats ( flatID int AUTO_INCREMENT NOT NULL, owner_email varchar(255), tenant_email varchar(255), buildingID int, floor_number int, flat_number int, start_date date, PRIMARY KEY (flatID), FOREIGN KEY (owner_email) REFERENCES owner(owner_email) ON DELETE CASCADE, FOREIGN KEY (tenant_email) REFERENCES tenant(tenant_email) ON DELETE CASCADE, FOREIGN KEY (buildingID) REFERENCES building(buildingID) ON DELETE CASCADE )",
  payment:
    "CREATE TABLE IF NOT EXISTS payment ( paymentID int AUTO_INCREMENT NOT NULL, flatID int, buildingID int, paid char(1), due_date date, rent_amount int, PRIMARY KEY (paymentID), FOREIGN KEY (flatID) REFERENCES flats(flatID) ON DELETE CASCADE, FOREIGN KEY (buildingID) REFERENCES building(buildingID) ON DELETE CASCADE )",
};

module.exports = Tables;
