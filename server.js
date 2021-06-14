
const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
const data = require('./data/weather.json');

app.use(cors()) // after you initialize your express app instance
require('dotenv').config();
const port = process.env.PORT;

class Forecast {
    constructor(description,date){
        this.date=date,
        this.description=description
    }
    
}
// a server endpoint 
app.get('/', // our endpoint name
    function (req, res) { // callback function of what we should do with our request
        res.send('Hello') // our endpoint function response
    })
app.get('/weather', // our endpoint name
    function (req, res) { // callback function of what we should do with our request
        const cityWeather=data['data'].map((val)=>new Forecast(val.weather.description,val.datetime))
        console.log(cityWeather)
        res.json(cityWeather) // our endpoint function response
    })


app.listen(port) // kick start the express server to work