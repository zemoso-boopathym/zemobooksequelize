import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app/app";

chai.should();
chai.use(chaiHttp);

describe("isAuthenticated middleware", () => {
  it("it should not allow user to get Posts if unauthenticated", (done) => {
    chai
      .request(app)
      .get("/post/getPosts")
      .send()
      .end((_, response) => {
        response.should.have.status(404);
        done();
      });
  });

  it("it should not allow user to get Posts for malformed token", (done) => {
    chai
      .request(app)
      .get("/post/getPosts")
      .auth("", { type: "bearer" })
      .end((_, response) => {
        response.should.have.status(401);
        done();
      });
  });
});
