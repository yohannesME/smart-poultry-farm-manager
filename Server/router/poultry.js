const express = require("express");
const router = express.Router();

const { getSensorData, uploadSensorData } = require("../controllers/poultry");

router.route("/").get(getSensorData);
router.route("/upload_sensor_data").get(uploadSensorData);

module.exports = router;
