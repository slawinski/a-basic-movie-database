process.env.NODE_ENV = "test";

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
          should.equal(err, null);
          res.should.have.status(200);
          res.should.be.html; // eslint-disable-line
          res.body.should.be.a("object");
          res.body.should.have.property("Title");
          res.body.Title.should.equal("The Avengers");
          done();
        });
    });
  });
  describe("GET /1", () => {
    it("should return a single movie", done => {
      chai
        .request(server)
        .get("/1")
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html; // eslint-disable-line
          res.body.should.be.a("object");
          res.body.should.have.property("Title");
          res.body.name.should.equal("The Avengers");
          done();
        });
    });
  });
  describe("GET /5", () => {
    it("should not return a single movie", done => {
      chai
        .request(server)
        .get("/5")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
