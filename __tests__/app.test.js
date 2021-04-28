const request = require("supertest");
const { seed } = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const db = require("../db/connection.js");
const { dropTables, createTables } = require("../db/manage-tables.js");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/categories", () => {
  test("print something", () => {
    console.log("in test");
  });
});
