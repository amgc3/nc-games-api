const {
  selectReviews,
  selectReviewById,
  updateReview,
} = require('../models/reviews.model');

exports.getReviews = (req, res, next) => {
  const { sort_by } = req.query;
  selectReviews(sort_by)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      console.log(err)
      next(err);
    });
};
exports.getReview = (req, res, next) => {
  //   const review_id = req.params.review_id;
  const { review_id } = req.params;
  selectReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      console.log(err)
      next(err);
    });
};
exports.patchReview = (req, res, next) => {
  const review_id = req.params.review_id;
  const newVote = req.body.inc_votes;
  updateReview(review_id, newVote)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};
