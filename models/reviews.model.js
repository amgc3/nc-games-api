const db = require('../db/connection');

exports.selectReviews = (sort_by = 'created_at') => {
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

