const express = require("express");
const reviewRouter = express.Router();

reviewRouter.route("/").get(getReviews);

module.exports = reviewRouter;