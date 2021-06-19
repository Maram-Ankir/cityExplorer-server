const axios = require('axios');
const Weather = require('../models/weather.model');
require('dotenv').config();
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const Cache = require('../helper/cache');
const cacheObj = new Cache();

const weatherController = (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const requestKey = `weather-${lat}-${lon}`;
    console.log(requestKey);
    console.log(cacheObj[requestKey]);
    
    if (lat && lon) {
       
                // First check that the cache contains the location 
                if (cacheObj[requestKey] && (Date.now() - cacheObj[requestKey].timestamp < 86400000)) {
                    console.log('=====================');
                    console.log('From the cache Object');
                    console.log('=====================');
                    res.json(cacheObj[requestKey].data);
                } else {
                    // If we dont have the location stored in our object, 
                    //then request the data from the weather bit API
                    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
        
                    axios.get(weatherBitUrl).then(response => {
                        const responseData = response.data.data.map(obj => new Weather(obj));
                        console.log('=====================');
                        console.log('From the axios request');
                        console.log('=====================');
                        console.log('Storing the data from the request into our cache');
                        console.log('=====================');
                        // store the location and the data in the object
                        cacheObj[requestKey] = {data:[],timestamp:''};
                        cacheObj[requestKey].data = responseData
                        cacheObj[requestKey].timestamp = Date.now();
                        res.json(responseData)
                    }).catch(error => {
                        res.send(error.message)
                    });
                }
        
            } else {
                res.send('please provide the proper lat and lon')
            }

};
module.exports = weatherController;