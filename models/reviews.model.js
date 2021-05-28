const db = require('../db/connection');

// Promise.reject with our error object with status and msg this error object
// that we have created is passed to our controller, then passed 
// to app error handling middleware
exports.selectReviews = (sort_by = 'created_at', category) => {
  const allowedSortByColumns = ['created_at', 'title', 'votes', 'comments_count'];
  if (!allowedSortByColumns.includes(sort_by)) {
    return Promise.reject({status: 400, msg: 'Invalid sort_by query'});
  }
  // to be able to dynamically change the string
  let coreQueryString = `
  SELECT reviews.* , COUNT(comments.review_id) AS comments_count 
  FROM reviews 
  LEFT JOIN comments ON reviews.review_id = comments.review_id
  `;


  const queryValues = [];
  if (category) {
    coreQueryString += `WHERE category = $1`;
    queryValues.push(category);
  }

coreQueryString += `
  GROUP BY reviews.review_id
  ORDER BY ${sort_by} ASC`
  
  return db
  .query(coreQueryString, queryValues)
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
exports.selectComments = (review_id) => {
  return db.query(
    `SELECT comment_id, votes, created_at, author, body  FROM comments
    WHERE review_id = $1;`,
    [review_id]
  )
  .then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({status: 404, msg:'Not Found'});
    }
    return result.rows
  })
}

exports.insertComment = (review_id, author, body) => {
  return db.query(`INSERT INTO comments (review_id, author, body)
  VALUES ($1, $2, $3) RETURNING*;`, [review_id, author, body])
  .then((result) => {
    return result.rows[0];
  })
}

