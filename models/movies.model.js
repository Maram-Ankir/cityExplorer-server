
class Movie {
    constructor(title, overview, averageVotes, totalVotes, imgUrl, popularity, releasedOn){
      this.title = title;
      this.overview = overview;
      this.average_votes = averageVotes;
      this.total_votes = totalVotes;
      this.imageUrl = imgUrl;
      this.popularity = popularity;
      this.released_on = releasedOn;
    }
  }


  module.exports =Movie;