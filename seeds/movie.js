exports.seed = (knex, Promise) =>
  // Deletes ALL existing entries
  knex("movies")
    .del()
    .then(() => {
      const movies = [
        {
          id: "1",
          title: "test-title",
          genre: "test-genre",
          year: "2000",
          director: "test-director",
          country: "test-country",
          actors: "test-actors"
        },
        {
          id: "2",
          title: "test-title2",
          genre: "test-genre2",
          year: "2002",
          director: "test-director2",
          country: "test-country2",
          actors: "test-actors2"
        }
      ];
      return knex("movies").insert(movies);
    });
