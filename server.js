
const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
const data = require('./data/weather.json');

app.use(cors()) // after you initialize your express app instance

require('dotenv').config();
const port = process.env.PORT;
// a server endpoint 
app.get('/', // our endpoint name
    function (req, res) { // callback function of what we should do with our request
        res.send('Hello') // our endpoint function response
    })
app.get('/data', // our endpoint name
    function (req, res) { // callback function of what we should do with our request
        res.json(data) // our endpoint function response
    })

app.listen(port) // kick start the express server to work