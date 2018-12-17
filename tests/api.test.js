const request = require("supertest");
const app = require("../app");

describe("Route GET /", () => {
  it("should return OK when hitting /", done => {
    request(app)
      .get("/")
      .expect(200, done);
  });
});
describe("Route GET /:id", () => {
  it("should respond with 200 when hitting existing movie", done => {
    request(app)
      .get("/22")
      .expect(200, done);
  });
});
describe.skip("Route POST /", () => {
  const data = {
    id: "1",
    title: "dummy"
  };
  it("should respond with 201 (created)", done => {
    request(app)
      .post("/")
      .send(data)
      .set("Accept", "application/json")
      .expect(201)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
