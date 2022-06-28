import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app/app";

chai.should();
chai.use(chaiHttp);

describe("Welcome API", () => {
  /* Welcome page GET route */
  describe("GET /", () => {
    it("it should get the welcome page", (done) => {
      chai
        .request(app)
        .get("/")
        .end((_req, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
