# Expense Tracker

Expense Tracker is a single page web application for recording expenses and generating reports. It is built with Node, Express, Mongo, React, and Redux.

Run locally with:

```shell
  npm install
  npm start
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
