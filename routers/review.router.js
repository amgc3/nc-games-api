const express = require('express');
const {
  getReviews,
  getReview,
  patchReview,
  getComments,
} = require('../controllers/review.controller');
const reviewRouter = express.Router();

reviewRouter.route('/').get(getReviews);
reviewRouter.route('/:review_id').get(getReview).patch(patchReview);
reviewRouter.route('/:review_id/comments').get(getComments);

module.exports = reviewRouter;
