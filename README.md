# a-basic-movie-database

[![Build Status](https://travis-ci.com/slawinski/a-basic-movie-database.svg?branch=master)](https://travis-ci.com/slawinski/a-basic-movie-database)

A super duper simple movie database interacting with external API.

## Getting started

Make sure you have Docker and Compose installed and running locally ([click](https://www.docker.com)). Then run:

```bash
docker-compose run --rm --service-ports web bash
```

There's no database yet. To create postgresql database run:

```bash
docker exec -it $(docker-compose ps -q db) psql -U postgres
```

And then:

```sql
create database movies_db;
```

To have the database structure available locally run the migrations in docker bash:

```bash
npx knex migrate:latest
```

then

```bash
npm run start:dev
```

And you're golden.

## Running the tests

TBD

## Deployment

To deploy the app on Heroku you need to run the below commands. Make sure you have a working Docker installation (eg. docker ps) and that you’re logged in to Heroku (heroku login).

```bash
heroku container:login
heroku create
heroku addons:create heroku-postgresql:hobby-dev
heroku container:push web
heroku container:release web
```

Migrations have to be initiated in heroku CLI

```bash
heroku run bash
npx knex migrate:latest --env production
```

And one last thing

```
heroku open
```

## TODOs

✅ README\
✅ Docker\
✅ Webpack\
✅ Linter\
✅ Implement ORM/query builder\
✅ Heroku\
✅ Refactor Comments - Update & Delete\
✅ Authentication\
✅ Tests\
❌ Responsiveness\
❌ Stars\

## License

TBD

## Acknowledgments

This app would never come to existence if it wasn't for netguru and their demanding junior dev recruitment process which I've failed miserably.
