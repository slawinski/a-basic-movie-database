# a-basic-movie-database

A super duper simple movie database interacting with external API.

## Getting started

Make sure you have Docker and Compose installed and running locally ([click](https://www.docker.com)). Then run:

```bash
docker-compose up --build
```

There's no database yet. To create postgresql database run:

```bash
docker exec -it $(docker-compose ps -q postgres9 ) psql -U postgres
```

And then:

```sql
create database movies_db;
```

To have the database structure available locally run the migrations:

```bash
knex migrate:latest
```

And you're golden.

For the bash shell run:

```bash
docker-compose run web /bin/bash
```

## Running the tests

TBD

## Deployment

To deploy the app on Heroku ryou need to run the below commands.

```bash
heroku login
heroku create
heroku addons:create heroku-postgresql:hobby-dev
heroku container:push web
heroku container:release web
heroku run bash
knex migrate:latest --env production
heroku open
```

## TODOs

✅ README\
✅ Docker\
✅ Webpack\
✅ Linter\
❌ Tests\
✅ Heroku\
✅ Refactor Comments\
❌ User Login\
✅ Implement ORM/query builder

## License

TBD

## Acknowledgments

TBD
