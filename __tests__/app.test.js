const request = require('supertest');
const seed = require('../db/seeds/seed.js');
const testData = require('../db/data/test-data/index.js');
const db = require('../db/connection.js');
const { dropTables, createTables } = require('../db/manage-tables.js');

beforeEach(() => {
  return dropTables().then(() => {
    return createTables();
  });
});

describe('this is a test', () => {
    test('print something', () => {
        console.log('in test')
    })
})