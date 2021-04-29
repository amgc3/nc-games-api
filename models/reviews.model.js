const db = require('../db/connection');

exports.selectReviews = () => {
  return db.query(`SELECT * FROM reviews;`).then((result) => {
    return result.rows;
  });
};