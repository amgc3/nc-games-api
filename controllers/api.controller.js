const apiFile = require('../endpoints.json')

exports.getJsonApi = (req, res, next) => {
    res.status(200).send(apiFile);
}