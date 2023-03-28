const mysql = require("mysql");

const Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sensor_data",
});

module.exports = Connection;
