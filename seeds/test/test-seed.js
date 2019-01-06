exports.seed = function(knex, Promise) {
  return knex("movies")
    .del() // Deletes ALL existing entries
    .then(function() { // eslint-disable-line
      return knex("movies").insert({
        Title: "The Avengers",
        Year: "2012",
        Rated: "PG-13",
        Released: "04 May 2012",
        Runtime: "143 min",
        Genre: "Action, Adventure, Sci-Fi",
        Director: "Joss Whedon",
        Writer:
          "Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)",
        Actors: "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth",
        Plot:
          "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        Language: "English, Russian, Hindi",
        Country: "USA",
        Awards: "Nominated for 1 Oscar. Another 38 wins & 79 nominations.",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        Metascore: "69",
        imdbRating: "8.1",
        imdbVotes: "1,136,922",
        imdbID: "tt0848228",
        Type: "movie",
        DVD: "25 Sep 2012",
        BoxOffice: "$623,279,547",
        Production: "Walt Disney Pictures",
        Website: "http://marvel.com/avengers_movie",
        Response: "True"
      });
    });
};
