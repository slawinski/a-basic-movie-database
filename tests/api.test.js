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
          res.should.be.json; // eslint-disable-line
          res.body.should.be.a("array");
          res.body.length.should.equal(4);
          res.body[0].should.have.property("Title");
          res.body[0].name.should.equal("The Avengers");
          res.body[0].explicit.should.equal(false);
          done();
        });
    });
  });
});
