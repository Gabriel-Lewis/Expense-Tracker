const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../backend/server');
const {Expense} = require('../backend/db/models/expense');
// const {User} = require('./../../backend/db/models/user');
const {expenses, populateExpenses} = require('./seeds/expense');

const {userOneToken, populateUsers} = require('./seeds/user')

beforeEach(populateExpenses);
beforeEach(populateUsers);

describe("POST /api/expenses", () => {
  it("should create a new expense", (done) => {
    let description = 'Test Expense';
    let expense = {
      description: 'Test Expense',
      amount: '10000',
      transactionDate: '01/01/2016'
    }

    request(app)
      .post('/api/expenses')
      .set('token', userOneToken)
      .send(expense)
      .expect(200)
      .expect((res) => {
        expect(res.body.description).toBe(description);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Expense.find().then((expenses) => {
          expect(expenses.length).toBe(4);
          expect(expenses[3].description).toBe(description);
          done();
        }).catch((e) => done(e));
      });
  });

  it("should not create expense with invalid body data", (done) => {
    request(app)
    .post('/api/expenses')
    .set('token', userOneToken)
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err)
      }

      Expense.find().then((expenses) => {
        expect(expenses.length).toBe(3);
        done();
      }).catch((e) => done(e));
    })
  });

});

describe("GET /api/expenses", () => {
  it("should return all expenses", (done) => {
    request(app)
      .get("/api/expenses")
      .set('token', userOneToken)
      .expect(200)
      .expect((res) => {
        expect(res.body.expenses.length).toBe(2);
      })
      .end(done)
  });
});

describe("GET /api/expenses/:id", () => {
  it("should return a specific expense", (done) => {
    request(app)
    .get(`/api/expenses/${expenses[0]._id.toHexString()}`)
    .set('token', userOneToken)
    .expect(200)
    .expect((res) => {
      expect(res.body.description).toBe(expenses[0].description)
    })
    .end(done)
  });
  it("should return 404 if expense is not found", (done) => {
    let id = new ObjectID()
    request(app)
    .get(`/api/expenses/${id.toHexString()}`)
    .set('token', userOneToken)
    .expect(404)
    .end(done)
  });
  it("should return 404 from non-object ids", (done) => {
    let id = new ObjectID()
    request(app)
    .get('/api/expenses/123')
    .set('token', userOneToken)
    .expect(404)
    .end(done)
  });


});

describe('DELETE /api/expenses/:id', () => {
  it('should remove a expense', (done) => {
    var hexId = expenses[0]._id.toHexString();

    request(app)
      .delete(`/api/expenses/${hexId}`)
      .set('token', userOneToken)
      .expect(200)
      .expect((res) => {
        expect(res.body.expense._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Expense.findById(hexId).then((expense) => {
          expect(expense).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if expense not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/api/expenses/${hexId}`)
      .set('token', userOneToken)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/api/expenses/123abc')
      .set('token', userOneToken)
      .expect(404)
      .end(done);
  });
});

describe("PUT /api/expenses/:id", () => {
  it("should update the expense", (done) => {
    var hexId = expenses[0]._id.toHexString();
    let description = 'Test Expense';
    let expense = {
      description: 'Test Expense',
      amount: '10000',
      transactionDate: '01/01/2016'
    }

    request(app)
      .put(`/api/expenses/${hexId}`)
      .set('token', userOneToken)
      .send({
        description
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.expense.description).toBe(description);
      })
      .end(done)
  });
});
