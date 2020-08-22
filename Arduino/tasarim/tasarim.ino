#include "DHT.h"
#define DHTPIN 2

#define DHTTYPE DHT11

DHT tasarim(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  tasarim.begin();
}

void loop() {
  float t = tasarim.readTemperature();
  delay(2000);
  Serial.println(t);

}
