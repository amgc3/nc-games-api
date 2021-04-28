const { selectCategories } = require("../models/categories.model.js");

exports.getCategories = (req, res) => {
  selectCategories().then((categories) => {
    console.log("inside getCategories");
  });
};
