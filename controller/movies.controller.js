const axios = require('axios');
const Movie = require('../models/movies.model');
require('dotenv').config();
const MOVIES_BIT_KEY = process.env.MOVIES_BIT_KEY;

const moviesController = async(req,res)=>{
    const cityName =req.query.cityName
    try{
        const response=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIES_BIT_KEY}&query=${cityName}`)
        const movieData=response.data
        res.json(movieData.results.map(val=>new Movie(val.title,val.overview,val.vote_average,val.vote_count,'https://image.tmdb.org/t/p/w500' + val.poster_path,val.popularity,val.release_date)))
    }catch(error){
        res.send(error.message)
    }
 
}

module.exports = moviesController;