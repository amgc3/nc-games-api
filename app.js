const express = require('express');
const apiRouter = require('./routers/api.router.js');

const app = express();
app.use(express.json());

app.use('/api', apiRouter);


app.use((err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Bad Request' });
  } else if (err.code === '42601') {
    res.status(400).send({msg: 'Invalid sort_by query'})
  }else if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});

module.exports = app;
