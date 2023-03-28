const getSensorData = async (req, res) => {
  connection.query(
    "SELECT temperature, moisture1, moisture2, humidity, reading_time FROM sensor ORDER BY id DESC LIMIT 10",
    function (err, result, fields) {
      if (err) throw err;
      res.status(200).json(result);
    }
  );
};

const uploadSensorData = async (req, res) => {
  var temp = req.query.temp;
  var hum = req.query.hum;
  var moist1 = req.query.moist1;
  var moist2 = req.query.moist2;
  var iswatering = req.query.iswatering;

  var post = {
    temperature: temp,
    humidity: hum,
    moisture1: moist1,
    moisture2: moist2,
  };
  var query = connection.query(
    "INSERT INTO sensor SET ?",
    post,
    function (error, results, fields) {
      if (error) throw error;
    }
  );

  post = {
    iswatering: iswatering,
  };
  query = connection.query(
    "INSERT INTO watering SET ?",
    post,
    function (err, result, fields) {
      if (err) throw err;
    }
  );
  console.log(query.sql);
  res.status(201).json({ msg: "Data saved successfully" });
};

module.exports = {
  getSensorData,
  uploadSensorData,
};
