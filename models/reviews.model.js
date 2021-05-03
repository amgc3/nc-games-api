const db = require('../db/connection');

// Promise.reject with our error object with status and msg this error object
// that we have created is passed to our controller, then passed 
// to app error handling middleware
exports.selectReviews = (sort_by = 'created_at') => {
  const allowedSortByColumns = ['created_at', 'title', 'votes', 'comments_count'];
  if (!allowedSortByColumns.includes(sort_by)) {
    return Promise.reject({status: 400, msg: 'Invalid sort_by query'});
  }
  return db
  .query(`SELECT reviews.* , COUNT(comments.review_id) 
  AS comments_count FROM reviews LEFT JOIN comments
  ON reviews.review_id = comments.review_id
  GROUP BY reviews.review_id
  ORDER BY reviews.${sort_by} ASC;`)
  .then((result) => {
    return result.rows;
  });
};

exports.selectReviewById = (reviewId) => {
  return db
    .query(
      `SELECT reviews.* , COUNT(comments.review_id) AS comments_count 
      FROM reviews LEFT JOIN comments 
      ON reviews.review_id = comments.review_id
      WHERE reviews.review_id = $1
      GROUP BY reviews.review_id;`,
      [reviewId]
    )
    .then((result) => {
      const review = result.rows[0];
      if (!review) {
        return Promise.reject({ status: 404, msg: 'Not Found' });
      }
      return review;
    });
};
exports.updateReview = (reviewId, newVote = 0) => {
  return db
    .query(
      `UPDATE reviews 
        SET votes = votes + $1
        WHERE review_id = $2
        RETURNING * ;`,
      [newVote, reviewId]
    )
    .then((result) => {
      const review = result.rows[0];
      if (!review) {
        return Promise.reject({ status: 404, msg: 'Not Found' });
      }
      return review;
    });
};

