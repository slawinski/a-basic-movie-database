# a-basic-movie-database

A super duper simple movie database interacting with external API.

## Endpoint specification

* POST /movies:
Request body should contain only movie title, and its presence should be validated.
Based on passed title, other movie details should be fetched from http://www.omdbapi.com/ (or other similar, public movie database) - and saved to application database.
Request response should include full movie object, along with all data fetched from external API.
* GET /movies:
Should fetch list of all movies already present in application database.
Additional filtering, sorting is fully optional (BONUS points)
* POST /comments:
Request body should contain ID of movie already present in database, and comment text body.
Comment should be saved to application database and returned in request response.
* GET /comments:
Should fetch list of all comments present in application database.
Should allow filtering comments by associated movie, by passing its ID.

## Getting Started

You need to install Node.js.

## Running the tests

TBD

## Deployment

Website was deployed on Heroku. To do that by yourself follow the below steps

```
npm install -g heroku-cli
heroku login
heroku create <app_name>
git push heroku master
heroku addons:create heroku-postgresql:hobby-dev
heroku pg:psql > <file_name>.sql
heroku open
```

## TODOs
✅ README\
❌ Docker\
❌ Webpack\
❌ Linter\
❌ Tests\
✅ Heroku\
❌ Refactor Comments\
❌ Styling\
❌ User Login

## License

TBD

## Acknowledgments

TBD

