// const request = require('request')

// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3VtYXJpc2hpdmFuaSIsImEiOiJjazd1OWJpdGMxM3BlM21vdW90Y3EwZmI3In0.llFDL4GbsECEqx9CnSv0uQ'
   
//     request({url, json: true }, (error, { body }) => {
//        if(error){
//           callback('Unable to connect to location services!', undefined)
//        }else if(body.features.length === 0){
//     callback('Unable to find location. Try another search.', undefined)
//        } else{
//           callback(undefined, {
//             longitude: body.features[0].center[0],
//             latitude: body.features[0].center[1],
//             location: body.features[0].place_name
//           })
//        }
//     } )
   
//    }
//    module.exports = geocode


const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicmF1c2hhbjYwNiIsImEiOiJjazdwMXo3aXowMng0M2VvZnZtaWZxaWM1In0.HlkLfuHlSdYzJCwwY0W_gg&limit=1";

  request(
    {
      url,
      json: true
    },
    (error, {body}) => {
      if (error) {
        callback("Unable to connect to location services!", undefined);
      } else if (body.features.length === 0) {
        callback("Unable to find location. Try another Search.", undefined);
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
        });
      }
    }
  );
};

module.exports = geocode;