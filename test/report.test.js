const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../backend/server');
const {Report} = require('../backend/db/models/report');
// const {User} = require('./../../backend/db/models/user');
const {reports, populateReports} = require('./seeds/report');
const {populateExpenses} = require('./seeds/expense');

const {userOneToken, populateUsers} = require('./seeds/user')

beforeEach(populateExpenses);
beforeEach(populateUsers);
beforeEach(populateReports);

describe("POST /api/reports", () => {
  it("should create a new report", (done) => {
    let startDate = '12/01/2016'
    let report = {
      startDate,
      endDate: '12/30/2017'
    }

    request(app)
      .post('/api/reports')
      .set('token', userOneToken)
      .send(report)
      .expect(200)
      .expect((res) => {
        expect(res.body.expenseList.length).toBe(1);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Report.find().then((reports) => {
          expect(reports.length).toBe(4);
          done();
        }).catch((e) => done(e));
      });
  });

  it("should not create report with invalid body data", (done) => {
    request(app)
    .post('/api/reports')
    .set('token', userOneToken)
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err)
      }

      Report.find().then((reports) => {
        expect(reports.length).toBe(3);
        done();
      }).catch((e) => done(e));
    })
  });

});

describe("GET /api/reports", () => {
  it("should return all reports", (done) => {
    request(app)
      .get("/api/reports")
      .set('token', userOneToken)
      .expect(200)
      .expect((res) => {
        expect(res.body.reports.length).toBe(2);
      })
      .end(done)
  });
});

describe("GET /api/reports/:id", () => {
  it("should return a specific report", (done) => {
    request(app)
    .get(`/api/reports/${reports[0]._id.toHexString()}`)
    .set('token', userOneToken)
    .expect(200)
    .expect((res) => {
      expect(res.body.description).toBe(reports[0].description)
    })
    .end(done)
  });
  it("should return 404 if report is not found", (done) => {
    let id = new ObjectID()
    request(app)
    .get(`/api/reports/${id.toHexString()}`)
    .set('token', userOneToken)
    .expect(404)
    .end(done)
  });
  it("should return 404 from non-object ids", (done) => {
    let id = new ObjectID()
    request(app)
    .get('/api/reports/123')
    .set('token', userOneToken)
    .expect(404)
    .end(done)
  });


});

describe('DELETE /api/reports/:id', () => {
  it('should remove a report', (done) => {
    var hexId = reports[0]._id.toHexString();

    request(app)
      .delete(`/api/reports/${hexId}`)
      .set('token', userOneToken)
      .expect(200)
      .expect((res) => {
        expect(res.body.report._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Report.findById(hexId).then((report) => {
          expect(report).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if report not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/api/reports/${hexId}`)
      .set('token', userOneToken)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/api/reports/123abc')
      .set('token', userOneToken)
      .expect(404)
      .end(done);
  });
});
