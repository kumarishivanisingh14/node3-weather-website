// const request = require('request')

// const forecast = (latitude, longitude, callback) => {
//     const url = 'https://api.darksky.net/forecast/6552d936630655fa13121787e190d00b/' + latitude + ',' + longitude
//     request({url, json: true }, (error, { body }) => {
//             //console.log(response.body.currently)
//             if (error){
//                 callback('Unable to connect to weather services!', undefined)
//             }else if(body.error){
//                callback('Unable to find location! Try another one', undefined)
//             }
//             else{
//                callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature +' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
//             }
//          })
        
// }

// module.exports = forecast

const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/4c50d98e3f7ddc7ed79d0ec8068257ca/" +
    latitude +
    "," +
    longitude;

  request(
    {
      url,
      json: true
    },
    (error, {body}) => {
      if (error) {
        callback("Unable to connect to Weather Service", undefined);
      } else if (body.error) {
        callback("Unable to find loaction", undefined);
      } else {
        console.log(body.daily.data[0])
        callback(undefined, body.daily.data[0].summary+' '+'It is currentyl: '+body.currently.temperature+' degree out. '+ 'This is high today is '+body.daily.data[0].temperatureHigh+' with a low of '+body.daily.data[0].temperatureLow+'. There is a ' + body.currently.precipProbability+' rain probability.');
      }
    }
  );
};

module.exports = forecast;