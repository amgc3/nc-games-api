# Games Reviews API

I am building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

Endpoint testing has been implemented using Jest and Supertest. 

The database used is PSQL, the interaction is done with [node-postgres](https://node-postgres.com/).


The hosted version can be found here https://annas-games-reviews.herokuapp.com/api/

---
To test, clone this repository.
To install required dependencies, use npm install.
Create .env.development file containing `PGDATABASE=nc_games`.
Create .env.test file containing `PGDATABASE=nc_games_test`.
Use npm `run seed` to seed the database.

---

_Here is a summary of all the endpoints._

**Implemented Endpoints**


```http
GET /api/categories
GET /api/reviews/:review_id
PATCH /api/reviews/:review_id
GET /api/reviews
GET /api/reviews/:review_id/comments
POST /api/reviews/:review_id/comments
GET /api
```

**Next endpoints I intend to work through**

```http
DELETE /api/comments/:comment_id
GET /api/users
GET /api/users/:username
PATCH /api/comments/:comment_id
```

---

_More detail about each endpoint._

#### **GET /api/categories**

Responds with:

- an array of category objects, each of which has the following properties:
  - `slug`
  - `description`

---

#### **GET /api/reviews/:review_id**

Responds with:

- a review object, with the following properties:

  - `owner` which is the `username` from the users table
  - `title`
  - `review_id`
  - `review_body`
  - `designer`
  - `review_img_url`
  - `category`
  - `created_at`
  - `votes`
  - `comment_count` which is the total count of all the comments with this review_id

---

#### **PATCH /api/reviews/:review_id**

Request body accepts:

- an object in the form `{ inc_votes: newVote }`

  - `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current review's vote property by 1

  `{ inc_votes : -100 }` would decrement the current review's vote property by 100

Responds with:

- the updated review

---

#### **GET /api/reviews**

Responds with:

- a `reviews` array of review objects, each of which has the following properties:
  - `owner` which is the `username` from the users table
  - `title`
  - `review_id`
  - `category`
  - `review_img_url`
  - `created_at`
  - `votes`
  - `comment_count` which is the total count of all the comments with this review_id - you should make use of queries to the database in order to achieve this

Accepts queries:

- `sort_by`, which sorts the reviews by any valid column (defaults to date)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)
- `category`, which filters the reviews by the category value specified in the query

---

#### **GET /api/reviews/:review_id/comments**

Responds with:

- an array of comments for the given `review_id`; each comment has the following properties:
  - `comment_id`
  - `votes`
  - `created_at`
  - `author` which is the `username` from the users table
  - `body`

---

#### **POST /api/reviews/:review_id/comments**

Request body accepts:

- an object with the following properties:
  - `username`
  - `body`

Responds with:

- the posted comment

---

#### **GET /api**

Responds with:

- JSON describing all the API available endpoints



