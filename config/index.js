var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/ExpenseApp'
  process.env.JWT_SECRET = 'asdfasdfaslasdf'
} else if (env === 'test') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/ExpenseAppTest'
  process.env.JWT_SECRET = 'asdkfjalksdfalksdfjlkj'
}
