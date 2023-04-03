const mysql = require("mysql");

const Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "poultry_data",
});

module.exports = Connection;
