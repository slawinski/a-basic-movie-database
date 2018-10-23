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
        }
      ];
      return knex("movies").insert(movies);
    });
