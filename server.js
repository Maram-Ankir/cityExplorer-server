const express = require('express') 
const app = express() 
const cors = require('cors');
const data = require('./data/weather.json');
app.use(cors()) 
const axios = require('axios');
require('dotenv').config();
const port = process.env.PORT;

const weatherController = require('./controller/weather.controller');
const indexController = require('./controller/index.controller');
const moviesController = require('./controller/movies.controller');



app.get('/',indexController )

app.get('/weather',weatherController)

app.get('/movies',moviesController)

app.listen(port)