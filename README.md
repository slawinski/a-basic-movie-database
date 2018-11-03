# a-basic-movie-database

A super duper simple movie database interacting with external API.

## Getting started

Make sure you have Docker and Compose installed and running locally ([click](https://www.docker.com)).

Then run:

```bash
docker-compose up --build
```

For the bash shell run:

```bash
docker-compose run web /bin/bash
```

```bash
docker exec -it $(docker-compose ps -q postgres9 ) psql -U postgres
```

## Running the tests

TBD

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
