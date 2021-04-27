const format = require("pg-format");
const db = require("../connection.js");
const { dropTables, createTables } = require("../manage-tables.js");
const { keyReplacer } = require("../utils/data-manipulation.js");

exports.seed = function ({ categoryData, commentData, reviewData, userData }) {
  return dropTables()
    .then(() => {
      return createTables();
    })
    .then(() => {
      const insertCategoriesQueryString = format(
        "INSERT INTO categories ( slug, description) VALUES %L RETURNING *;",
        categoryData.map(({ slug, description }) => [slug, description])
      );
      return db.query(insertCategoriesQueryString);
    })
    .then(() => {
      const insertUsersQueryString = format(
        "INSERT INTO users (username, avatar_url, name) VALUES %L RETURNING *;",
        userData.map(({ username, avatar_url, name }) => [
          username,
          avatar_url,
          name,
        ])
      );
      return db.query(insertUsersQueryString);
    })
    .then(() => {
      const insertReviewsQueryString = format(
        `INSERT INTO reviews 
      (title, review_body, designer, review_img_url, votes, category, owner, created_at) 
      VALUES %L RETURNING *;`,
        reviewData.map(
          ({
            title,
            review_body,
            designer,
            review_img_url,
            votes,
            category,
            owner,
            created_at,
          }) => [
            title,
            review_body,
            designer,
            review_img_url,
            votes,
            category,
            owner,
            new Date(created_at),
          ]
        )
      );
      return db.query(insertReviewsQueryString);
    })
    .then((result) => {
      const reviewsInTable = result.rows;
      // get the lookup table {title: review_id}
      // insert correct id at belongs_to
      // change key belongs_to to review_id
      const newCommentData = commentData.map((commentObject) => {
        return keyReplacer(commentObject, "created_by", "author");
      });
      const insertCommentsQueryString = format(
        `
      INSERT INTO comments
      (author, review_id, votes, created_at, body)
      VALUES %L RETURNING *;
      `,
        newCommentData.map(({ author, review_id, votes, created_at, body }) => [
          author,
          review_id,
          votes,
          new Date(created_at),
          body,
        ])
      );
      return db.query(insertCommentsQueryString);
    });
  // .then((result) => {
  //   console.log(result.rows);
  // });
};
