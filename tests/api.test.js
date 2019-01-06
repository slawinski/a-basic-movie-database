process.env.NODE_ENV = "test";

const request = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();
const server = require("../app");
const knex = require("../db/knex");

chai.use(chaiHttp);

describe("API Routes", () => {
  beforeEach(done => {
    knex.migrate.rollback().then(() => {
      knex.migrate.latest().then(() =>
        knex.seed.run().then(() => {
          done();
        })
      );
    });
  });

  afterEach(done => {
    knex.migrate.rollback().then(() => {
      done();
    });
  });

  describe("Get all movies", () => {
    it("should get all movies", done => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body[0].should.have.property("Title");
          res.body[0].Title.should.equal("The Avengers");
          done();
        });
    });
  });
  describe.skip("GET /:id", () => {
    it("should return a single show", done => {
      chai
        .request(server)
        .get("/1")
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json; // eslint-disable-line
          res.body.should.be.a("object");
          res.body.should.have.property("Title");
          res.body.name.should.equal("The Avengers");
          done();
        });
    });
  });
});
