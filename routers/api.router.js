const express = require("express");
const categoryRouter = require("./category.router.js");
const reviewRouter = require("./review.router.js");

const apiRouter = express.Router();

apiRouter.use("/categories", categoryRouter);
apiRouter.use("/reviews", reviewRouter);

module.exports = apiRouter;
