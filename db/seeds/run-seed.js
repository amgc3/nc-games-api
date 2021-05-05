/*
Here you will need to require in:
- the seed function, 
- the dev data,
*/
const db = require('../connection')
const { seed } = require('./seed');
const data = require('../data/development-data');


const runSeed =  () => {
  // run the seed with the data
  return seed(data).then(() => db.end())
};

runSeed();
