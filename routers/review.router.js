const express = require('express');
const { getReviews, getReview } = require('../controllers/review.controller');
const reviewRouter = express.Router();

reviewRouter.route('/').get(getReviews);
reviewRouter.route('/:review_id').get(getReview);

module.exports = reviewRouter;
