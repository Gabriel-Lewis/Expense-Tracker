const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../backend/server');
const {User} = require('../backend/db/models/user');
const {users, populateUsers} = require('./seeds/user');

beforeEach(populateUsers);

describe("GET /api/session", (done) => {
  it("should return user if authenticated", (done) => {
    request(app)
      .get('/api/session')
      .set('token', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.user._id).toBe(users[0]._id.toHexString());
        expect(res.body.user.email).toBe(users[0].email);
      })
      .end(done);
  });

  it("should return 401 if not authenticated", (done) => {
    request(app)
      .get('/api/session')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({"message": "User not logged in"});
      })
      .end(done);
  });
});

describe("POST /users", () => {
  it("should create a user", (done) => {
    let email = 'example@example.com';
    let password = '123asdflkj';
    let admin = true
    request(app)
      .post('/api/users')
      .send({email, password, admin})
      .expect(200)
      .expect((res) => {
        expect(res.body.user._id).toExist();
        expect(res.body.user.email).toBe(email);
      })
      .end((err) => {
        if (err) {
          return done(err)
        }

        User.findOne({email}).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        }).catch((e) => (done(e)));;
      });
  });

  it("should return validation errors if request is invalid", (done) => {
    let email = 'laskdjfalskdf';
    let password = 'password';

    request(app)
      .post('/api/users')
      .send({email, password})
      .expect(400)
      .expect((res) => {
        // expect(res.headers['x-auth']).toNotExist();
        expect(res.body._id).toNotExist();
      })
      .end(done)

  });

  it("should not create user if email is in use", (done) => {
    let email = users[0].email;
    let password = 'password';
    let admin = true

    request(app)
      .post('/api/users')
      .send({email, password, admin})
      .expect(400)
      .expect((res) => {
        expect(res.body._id).toNotExist();
      })
      .end(done)
  });
});

describe("POST /api/session", () => {
  it("should login user and return auth token", (done) => {
    let email = users[1].email;
    let password = users[1].password;

    request(app)
      .post('/api/session')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.body.token).toExist();
        expect(res.body.user._id).toExist();
        expect(res.body.user.email).toBe(email);
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[1]).toInclude({
            access: 'auth'
          })
          done();
        }).catch((e) => (done(e)));
      })

  });

  it("should reject invalid login", (done) => {
    let email = users[1].email;
    let password = 'thiasdkfj';

    request(app)
      .post('/api/session')
      .send({email, password})
      .expect(400)
      .expect((res) => {
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens.length).toBe(1)
          done();
      }).catch((e) => done(e));
    });
  });
});
