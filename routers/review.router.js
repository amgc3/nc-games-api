const express = require('express');
const {
  getReviews,
  getReview,
  patchReview,
} = require('../controllers/review.controller');
const reviewRouter = express.Router();

reviewRouter.route('/').get(getReviews);
reviewRouter.route('/:review_id').get(getReview).patch(patchReview);

module.exports = reviewRouter;
