const express = require('express');
const { getReviews } = require('../controllers/review.controller');
const reviewRouter = express.Router();

reviewRouter.route('/').get(getReviews);

module.exports = reviewRouter;
