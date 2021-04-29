const db = require('../db/connection');

exports.selectReviews = () => {
  return db.query(`SELECT * FROM reviews;`).then((result) => {
    return result.rows;
  });
};
// exports.selectReview = (reviewId) => {
//   return db
//     .query(`SELECT * FROM reviews WHERE review_id = $1 ;`, [reviewId])
//     .then((result) => {
//       return result.rows[0];
//     });
// };
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
exports.updateReview = (reviewId, newVote) => {
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
