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

describe("Users API", () => {
  /* Login page GET route */
  describe("GET /login", () => {
    it("it should get the login page", (done) => {
      chai
        .request(app)
        .get("/login")
        .end((_req, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("GET /signup", () => {
    it("it should get the signup page", (done) => {
      chai
        .request(app)
        .get("/signup")
        .end((_req, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("GET /getallusers", () => {
    it("it should get throw an error when without authorization", (done) => {
      chai
        .request(app)
        .get("/getallusers")
        .end((_req, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("POST /login", () => {
    it("it should successfully login on posting valid user credentials", (done) => {
      const testUser = {
        email: "test@test.com",
        password: config.TEST_PWD,
      };
      chai
        .request(app)
        .post("/login")
        .send(testUser)
        .end((_req, res) => {
          res.should.have.status(200);
          res.body.should.have.property("token");
          done();
        });
    });

    it("it should throw an error with wrong user credentials", (done) => {
      const testUser = {
        email: "new@new",
        password: config.WRONG_PWD,
      };
      chai
        .request(app)
        .post("/login")
        .send(testUser)
        .end((_req, res) => {
          res.should.have.status(500);
          done();
        });
    });

    it("it should throw an error with empty user credentials", (done) => {
      const testUser = {};
      chai
        .request(app)
        .post("/login")
        .send(testUser)
        .end((_req, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe("POST /signup", () => {
    it("it should successfully register and post valid success message", (done) => {
      const timeStamp = new Date().getTime();
      const testUser = {
        email: `test${timeStamp}@test.com`,
        password: config.TEST_PWD,
      };
      chai
        .request(app)
        .post("/signup")
        .send(testUser)
        .end((_req, res) => {
          res.should.have.status(201);
          done();
        });
    });

    it("it should throw an error with invalid user credentials", (done) => {
      const testUser = {
        email: "",
        password: "",
      };
      chai
        .request(app)
        .post("/signup")
        .send(testUser)
        .end((_req, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });

  describe("GET /getallusers", () => {
    it("it should return all the registered users", (done) => {
      const token = "some_secret";
      chai
        .request(app)
        .get("/getallusers")
        .set({ Authorization: `Bearer ${token}` })
        .end((_req, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("POST /logout", () => {
    it("it should logout the user from application", (done) => {
      chai
        .request(app)
        .post("/logout")
        .end((_req, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("GET /getAllUsers", () => {
    it("it should get all valid users for admin", (done) => {
      chai
        .request(app)
        .get("/getallusers")
        .auth(config.ADMIN_TOKEN!, { type: "bearer" })
        .end((_, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  describe("DELETE /deleteUser", () => {
    it("it should delete the test user added for testing", (done) => {
      chai
        .request(app)
        .get("/getallusers")
        .auth(config.ADMIN_TOKEN!, { type: "bearer" })
        .end((_, response) => {
          response.should.have.status(200);

          const usersData = response.body.users;
          const testMail = usersData[usersData.length - 1].email;

          chai
            .request(app)
            .delete("/deleteUser")
            .auth(config.ADMIN_TOKEN!, { type: "bearer" })
            .send({ email: testMail })
            .end((_req, resp) => {
              resp.should.have.status(200);
              done();
            });
        });
    });

    it("it should not delete any user added already in db", (done) => {
      chai
        .request(app)
        .delete("/deleteUser")
        .auth(config.ADMIN_TOKEN!, { type: "bearer" })
        .send({ email: "asdf@asdf.com" })
        .end((_, resp) => {
          resp.should.have.status(500);
          done();
        });
    });

    it("it should not delete any user for empty credentials", (done) => {
      chai
        .request(app)
        .delete("/deleteUser")
        .auth(config.ADMIN_TOKEN!, { type: "bearer" })
        .send({})
        .end((_, resp) => {
          resp.should.have.status(404);
          done();
        });
    });
  });

  describe("GET /error404", () => {
    it("it should not get any valid page", (done) => {
      chai
        .request(app)
        .get("/error404")
        .auth(config.ADMIN_TOKEN!, { type: "bearer" })
        .end((_, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});
