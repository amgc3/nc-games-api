const {
  selectReviews,
  selectReviewById,
  updateReview,
} = require('../models/reviews.model');

exports.getReviews = (req, res) => {
  selectReviews()
    .then((reviews) => {
      //console.log(reviews);
      res.status(200).send({ reviews });
    })
    .catch((err) => {
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
