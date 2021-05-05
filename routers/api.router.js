const express = require("express");
const categoryRouter = require("./category.router.js");
const reviewRouter = require("./review.router.js");
const { getJsonApi } = require('../controllers/api.controller')

const apiRouter = express.Router();

apiRouter.get('/', getJsonApi)
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/reviews", reviewRouter);

module.exports = apiRouter;
