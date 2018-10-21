# a-basic-movie-database

A super duper simple movie database interacting with external API.

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
✅ Docker\
✅ Webpack\
✅ Linter\
❌ Tests\
✅ Heroku\
❌ Refactor Comments\
❌ Styling\
❌ User Login\
❌ Implement ORM

## License

TBD

## Acknowledgments

TBD
