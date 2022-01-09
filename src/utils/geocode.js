const request = require('postman-request');



const geocode = (address , callback)=>{
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaGFtZWV0IiwiYSI6ImNreG9uMTg1ODF6amUyeXFrdG0yZDZsZGsifQ.dp2BBeIN5OCpwVTC_NZ1lQ&limit=1';

  request({url , json: true} , (error , {body})=>{
    if(error){
      callback('Unable to connect to the geocoding service!' , undefined);
    }else if( body.features.length === 0){
      callback('Unable to find location. Try another one' , undefined);
    }else{
      callback(undefined , {
        latitude : body.features[0].center[1],
        longitude : body.features[0].center[0],
        location : body.features[0].place_name
      })
    }
  });
}

module.exports = geocode;