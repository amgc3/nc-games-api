const format = require("pg-format");
const db = require("../connection.js");
const { dropTables, createTables } = require("../manage-tables.js");

exports.seed = function ({ categoryData, commentData, reviewData, userData }) {
  // add seeding functionality here
  // this function should take as argument(s) all the data it needs to seed
  // it should insert this data into the relevant tables in your database
  return dropTables().then(() => {
    return createTables();
  }).then(() => {
    const insertCategoriesQueryString = format(
      'INSERT INTO categories ( slug, description) VALUES %L RETURNING *;', categoryData.map(({ slug, description }) => [slug, description])
    );
    return db.query(insertCategoriesQueryString);
  }).then(() => {
    const insertUsersQueryString = format(
      'INSERT INTO users (username, avatar_url, name) VALUES %L RETURNING *;', userdata.map(({ username, avatar_url, name }) => [username, avatar_url, name])
    );
    return db.query(insertUsersQueryString);
  }).then(() => {
    const insertReviewsQueryString = format(

    )

  })
};
