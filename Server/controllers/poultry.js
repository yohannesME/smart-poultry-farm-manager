const connection = require("../db/connect");

const getSensorData = async (req, res) => {
  connection.query(
    "SELECT temperature, humidity, airQuality, reading_time FROM sensor ORDER BY id DESC LIMIT 10",
    function (err, result, fields) {
      if (err) throw err;
      res.status(200).json(result);
    }
  );
};

const uploadSensorData = async (req, res) => {
  var temp = req.query.temp;
  var hum = req.query.hum;
  var airQuality = req.query.airQuality;

  if (temp == 0 && hum == 0 && airQuality == 0) {
    return res.status(500).send("the data is all zero");
  }

  var post = {
    temperature: temp,
    humidity: hum,
    airQuality: airQuality,
  };
  var query = connection.query(
    "INSERT INTO sensor SET ?",
    post,
    function (error, results, fields) {
      if (error) throw error;
    }
  );

  res.status(201).json({ msg: "Data saved successfully" });
};

module.exports = {
  getSensorData,
  uploadSensorData,
};
