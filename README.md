# a-basic-movie-database

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
✅ Implement ORM/query builder\
✅ Heroku\
✅ Refactor Comments (Update & Delete)\
❌ User Login\
❌ Tests\
❌ Responsiveness\
❌ Stars\
❌ Algo to recommend movies

## License

TBD

## Acknowledgments

TBD
