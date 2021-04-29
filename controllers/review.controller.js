const { selectReviews, selectReviewById } = require('../models/reviews.model');

exports.getReviews = (req, res) => {
  selectReviews()
    .then((reviews) => {
      console.log('In reviews controller');
      //console.log(reviews);
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      res.status(500).send({ msg: 'Internal server error' });
    });
};
exports.getReview = (req, res) => {
  //   const review_id = req.params.review_id;
  const { review_id } = req.params;
  selectReviewById(review_id)
    .then((review) => {
      console.log(review);
      res.status(200).send({ review });
    })
    .catch((err) => {
      if (err.code === '22P02') {
        res.status(400).send({ msg: 'Bad Request' });
      } else if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
      } else {
        res.status(500).send({ msg: 'Internal Server Error' });
      }
    });
};
