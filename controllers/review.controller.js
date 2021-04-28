const { selectReviews } = require('../models/reviews.model');

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
