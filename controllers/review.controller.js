const {
  selectReviews,
  selectReviewById,
  updateReview,
  selectComments
} = require('../models/reviews.model');

exports.getReviews = (req, res, next) => {
  const { sort_by, category } = req.query;
  selectReviews(sort_by, category)
    .then((reviews) => {
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

exports.getComments = (req, res, next) => {
  const review_id = req.params.review_id;
  selectComments(review_id)
  .then((comments) => {
    res.status(200).send({comments})
  })
  .catch((err) => {
    console.log(err)
    next(err);
  })
}
