const express = require('express') 
const app = express() 
const cors = require('cors');
const data = require('./data/weather.json');
app.use(cors()) 
const axios = require('axios');
require('dotenv').config();
const port = process.env.PORT;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

// class Forecast {
//     constructor(description,date){
//         this.date=date,
//         this.description=description
//     }
    
// }

app.get('/', 
    function (req, res) { 
        res.send('Hello') 
    })
// app.get('/weather', 
//     function (req, res) { 
//         const cityWeather=data['data'].map((val)=>new Forecast(val.weather.description,val.datetime))
//         console.log(cityWeather)
//         res.json(cityWeather)
//     })


app.get('/weather', (req, res) => {

    const lat = req.query.lat;
    const lon = req.query.lon;
    if (lat && lon) {
        const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
        axios.get(weatherBitUrl).then(response => {
            const responseData = response.data.data.map(obj => new Weather(obj));
            res.json(responseData)
        }).catch(error => {
            res.send(error.message)
        });
    } else {
        res.send('please provide the proper lat and lon')
    }


});

class Weather {
    constructor(weatherData) {
        this.description = weatherData.weather.description;
        this.date = weatherData.valid_date;

    }
}


app.listen(port) 