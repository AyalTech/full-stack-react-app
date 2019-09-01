const request = require('request-promise');

const API_KEY = '9ffd0e10fa8474e07a5a90c81d53f50e';

class Weather {
  static retrieveByCity(city, callback){
    request({
      uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`,
      json: true
    })
    .then((res) => {
      callback(res)
    })
    .catch((err) => {
      callback({ error: `Could not reach OpenWeatherMap API : ${err}`})
    })
  }
}

module.exports = Weather;
