//ThatsEngineering
//Sending Data from Arduino to NodeMCU Via Serial Communication
//Arduino code

//DHT11 Lib
#include <dht.h>
#include <MQ135.h>
//Arduino to NodeMCU Lib
#include <SoftwareSerial.h>
#include <ArduinoJson.h>

//Initialise Arduino to NodeMCU (5=Rx & 6=Tx)
SoftwareSerial nodemcu(5, 6);

//Initialisation of DHT11 Sensor
#define DHTPIN 3
#define PIN_MQ135 A2

MQ135 mq135_sensor(PIN_MQ135);

dht DHT;

float temp;
float hum;
// int sensorValue;
// int digitalValue;
float airQuality;


void setup() {
  Serial.begin(9600);
  nodemcu.begin(9600);
  // pinMode(13, OUTPUT);
  // pinMode(2, INPUT);
  delay(1000);

  Serial.println("Program started");
}

void loop() {

  StaticJsonDocument<1000> doc;

  // sensorValue = analogRead(0); // read analog input pin 0
  // digitalValue = digitalRead(2);

  // if (sensorValue > 400)
  //   digitalWrite(13, HIGH);
  // else
  //   digitalWrite(13, LOW);

  // Serial.println(sensorValue, DEC); // prints the value read
  // Serial.println(digitalValue, DEC);

  //Obtain Temp and Hum data
  dht11_func();

  if(!isnan(hum)){

  //Assign collected data to JSON Object
  doc["humidity"] = hum;
  doc["temperature"] = temp; 
  doc["airQuality"] = airQuality;


  //Send data to NodeMCU

  serializeJson(doc,nodemcu);
  doc.clear();


  delay(7000);
  }
}


void dht11_func() {
    int readData = DHT.read11(DHTPIN); // Reads the data from the sensor
   temp = DHT.temperature; // Gets the values of the temperature
   hum = DHT.humidity; // Gets the values of the humidity
  airQuality = mq135_sensor.getPPM();
  Serial.print("Humidity: ");
  Serial.println(hum);
  Serial.print("Temperature: ");
  Serial.println(temp);
  Serial.print("Air Quality: ");
  Serial.println(airQuality);

}



