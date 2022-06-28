import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app/app";
import { config } from "../../util/config";

chai.should();
chai.use(chaiHttp);

const users = {
  admin: "admin@admin.com",
  test: "test@test.com",
};
const testPost = {
  title: "Sample Test Title",
  description: "Sample Test Description",
};

describe("Posts API", () => {
  describe("GET /getPosts", () => {
    it("it should logout user first", (done) => {
      chai
        .request(app)
        .post("/logout")
        .auth(config.USER_TOKEN!, { type: "bearer" })
        .end((_, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it("it should not get posts on not passing email", (done) => {
      chai
        .request(app)
        .get("/post/getPosts")
        .auth(config.USER_TOKEN!, { type: "bearer" })
        .end((_, response) => {
          response.should.have.status(401);
          done();
        });
    });
    it("it should successfully login and get logged in user posts", (done) => {
      chai
        .request(app)
        .get("/post/getPosts")
        .auth(config.USER_TOKEN!, { type: "bearer" })
        .send({ email: users.test })
        .end((_, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  describe("GET /createPost", () => {
    it("it should get the createPost page", (done) => {
      chai
        .request(app)
        .get("/post/createPost")
        .auth(config.USER_TOKEN!, { type: "bearer" })
        .send({ email: "test@test.com" })
        .end((_, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it("it should create the post by the logged in user", (done) => {
      chai
        .request(app)
        .post("/post/createPost")
        .auth(config.USER_TOKEN!, { type: "bearer" })
        .send({ ...testPost, email: "test@test.com" })
        .end((_, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it("it should not create any post by any user for no data", (done) => {
      chai
        .request(app)
        .post("/post/createPost")
        .auth(config.USER_TOKEN!, { type: "bearer" })
        .send({ email: "test@test.com" })
        .end((_, response) => {
          response.should.have.status(401);
          done();
        });
    });
  });

  describe("GET /getAllPosts", () => {
    it("it should get all posts from all user for the logged in admin user", (done) => {
      chai
        .request(app)
        .get("/post/getAllPosts")
        .auth(config.ADMIN_TOKEN!, { type: "bearer" })
        .end((_, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it("it should not get any posts for normal user", (done) => {
      chai
        .request(app)
        .get("/post/getAllPosts")
        .auth(config.USER_TOKEN!, { type: "bearer" })
        .end((_, response) => {
          response.should.have.status(401);
          done();
        });
    });

    it("it should not get any posts with invalid token", (done) => {
      chai
        .request(app)
        .get("/post/getAllPosts")
        .end((_, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe("DELETE /deletePost", () => {
    it("it should delete the post selected by the user", (done) => {
      chai
        .request(app)
        .get("/post/getAllPosts")
        .auth(config.ADMIN_TOKEN!, { type: "bearer" })
        .send({ ...testPost, email: users.admin })
        .end((_, response) => {
          response.should.have.status(200);

          const posts = response.body.posts;
          const sampleID = posts[posts.length - 1].id;

          chai
            .request(app)
            .delete("/post/deletePost")
            .auth(config.ADMIN_TOKEN!, { type: "bearer" })
            .send({ id: sampleID, email: users.admin })
            .end((_req, resp) => {
              resp.should.have.status(200);
              done();
            });
        });
    });

    it("it should not delete any post for invalid id", (done) => {
      chai
        .request(app)
        .delete("/post/deletePost")
        .auth(config.ADMIN_TOKEN!, { type: "bearer" })
        .send({ id: 0, email: users.test })
        .end((_, resp) => {
          resp.should.have.status(404);
          done();
        });
    });
  });
});
