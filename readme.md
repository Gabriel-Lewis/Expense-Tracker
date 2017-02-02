# Expense Tracker

Expense Tracker is a single page web application for recording expenses and generating reports. It is built with Node, Express, Mongo, React, and Redux.

[Live Demo](https://ancient-scrubland-72767.herokuapp.com/)

Run locally with:

```shell
  npm install
  npm start
```

Run Tests with:

```shell
  npm test
```

or Run Auto Updating Tests with:

```shell
  npm run test-watch
```

### API Routes

The Backend has api routes for creating users, expenses, and reports.

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`

### Session

- `POST /api/session`
  - Log User in
- `DELETE /api/session`
  - Log user out
- `GET /api/session`
  - Returns current user from session token


### Expences

- `GET /api/expenses`
  - Returns all expenses for Admin users
  - Returns just users expenses for normal users
- `POST /api/expenses`
- `PUT /api/expenses/:id`
- `DELETE /api/expenses/:id`

### Reports

- `GET /api/reports`
  - Returns all reports for current user
- `POST /api/reports`
  - creates a new report
- `DELETE /api/reports/:id`
  - Deletes a story


  # Schema Information

  ## Users
  column name     | data type | details
  ----------------|-----------|-----------------------
  id              | objectId  | not null, primary key
  email           | string    | not null, indexed, unique
  password        | string    | not null
  token           | array     | not null, indexed, unique
  admin           | boolean   | not null

  ## Expenses
  column name     | data type | details
  ----------------|-----------|-----------------------
  id              | integer   | not null, primary key
  description     | string    | not null
  transactionDate | date      | not null
  amount          | currency  | not null
  author          | objectId  | not null, foreign key (references users), indexed

  ## Reports
  column name | data type | details
  --------------|-----------|-----------------------
  id            | objectId  | not null, primary key
  author        | objectId  | not null, foreign key (references users), indexed
  totalAmount   | integer   | not null
  expenses      | array     | not null
