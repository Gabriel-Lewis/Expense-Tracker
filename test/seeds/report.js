const {Report} = require('./../../backend/db/models/report');
const {ObjectID} = require('mongodb');
const {userOneId, userTwoId} = require('./user')

const reports = [
  {
    _id: new ObjectID(),
    author: userOneId,
    startDate: '01/01/2016',
    endDate: '12/01/2017'
  },
  {
    _id: new ObjectID(),
    author: userTwoId,
    startDate: '01/01/2016',
    endDate: '12/01/2017'
    },
  {
    _id: new ObjectID(),
    author: userOneId,
    startDate: '01/01/2016',
    endDate: '12/01/2017'
  }
];

const populateReports = (done) => {
    Report.remove({}).then(() => {
      return Report.insertMany(reports);
    }).then(() => done());
}

module.exports = {
  reports,
  populateReports
}
