const request = require('supertest');
const { seed } = require('../db/seeds/seed.js');
const testData = require('../db/data/test-data/index.js');
const db = require('../db/connection.js');
const { dropTables, createTables } = require('../db/manage-tables.js');
const app = require('../app.js');

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe('GET /api/categories', () => {
  test('Status: 200 responds with a JSON object containing the categories', () => {
    return request(app)
      .get('/api/categories')
      .expect(200)
      .then((response) => {
        expect(response.body.categories).toEqual([
          {
            slug: 'euro game',
            description: 'Abstact games that involve little luck',
          },
          {
            slug: 'social deduction',
            description: "Players attempt to uncover each other's hidden role",
          },
          { slug: 'dexterity', description: 'Games involving physical skill' },
          {
            slug: "children's games",
            description: 'Games suitable for children',
          },
        ]);
      });
  });
});

describe('GET /api/reviews', () => {
  test('Status: 200 responds with a JSON object containing the reviews with their respective comments_count', () => {
    return request(app)
      .get('/api/reviews')
      .expect(200)
      .then((response) => {
        expect(response.body.reviews.length).toBeGreaterThan(0);
        response.body.reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              review_id: expect.any(Number),
              title: expect.any(String),
              review_body: expect.any(String),
              designer: expect.any(String),
              review_img_url: expect.any(String),
              votes: expect.any(Number),
              category: expect.any(String),
              owner: expect.any(String),
              created_at: expect.any(String),
              comments_count: expect.any(String),
            })
          );
        });
      });
  });

  test('Status 200, default sort order is by date, ascending', () => {
    return request(app)
      .get('/api/reviews')
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy('created_at');
      });
  });

  test('Status 200, accepts a sort_by query', () => {
    return request(app)
      .get('/api/reviews?sort_by=title')
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy('title');
      });
  });

  test('Status 200, reviews can be filtered by category', () => {
    return request(app)
      .get('/api/reviews?category=dexterity')
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(1);
        body.reviews.forEach((review) => {
          expect(review.category).toBe('dexterity');
        });
      });
  });

  test('Status 400 when passed an invalid sort_by query', () => {
    return request(app)
      .get('/api/reviews?sort_by=not-a-column')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid sort_by query');
      });
  });

  //to check that the user can only sort by predefined columns
  test('Status 400, when passed a sort_by query that is not allowed', () => {
    return request(app)
      .get('/api/reviews?sort_by=review_body')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid sort_by query');
      });
  });
});

describe('GET /api/reviews/:review_id', () => {
  test('Status 200, responds with a JSON object containing the review with the given id', () => {
    return request(app)
      .get('/api/reviews/2')
      .expect(200)
      .then((response) => {
        expect(response.body.review).toEqual({
          review_id: 2,
          title: 'Jenga',
          review_body: 'Fiddly fun for all the family',
          designer: 'Leslie Scott',
          review_img_url:
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
          votes: 5,
          category: 'dexterity',
          owner: 'philippaclaire9',
          created_at: '2021-01-18T10:01:41.251Z',
          comments_count: '3',
        });
      });
  });

  test('Status 400, when provided with an invalid review id', () => {
    return request(app)
      .get('/api/reviews/nonValidId')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad Request');
      });
  });

  test('Status 404, when provided with a review id that does not exist in the database', () => {
    const idNotInDatabase = 9999;
    return request(app)
      .get(`/api/reviews/${idNotInDatabase}`)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Not Found');
      });
  });
});
describe('PATCH /api/reviews/:review_id', () => {
  test('Status 200, responds with the updated review', () => {
    const reviewUpdate = {
      inc_votes: 1,
    };
    return request(app)
      .patch('/api/reviews/2')
      .send(reviewUpdate)
      .expect(200)
      .then((response) => {
        expect(response.body.review).toEqual({
          review_id: 2,
          title: 'Jenga',
          review_body: 'Fiddly fun for all the family',
          designer: 'Leslie Scott',
          review_img_url:
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
          votes: 6,
          category: 'dexterity',
          owner: 'philippaclaire9',
          created_at: '2021-01-18T10:01:41.251Z',
        });
      });
  });

  test('Status 200, if no inc_votes on request body, the returned review is unchanged', () => {
    const reviewUpdate = {};
    return request(app)
      .patch('/api/reviews/2')
      .send(reviewUpdate)
      .expect(200)
      .then((response) => {
        expect(response.body.review).toEqual({
          review_id: 2,
          title: 'Jenga',
          review_body: 'Fiddly fun for all the family',
          designer: 'Leslie Scott',
          review_img_url:
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
          votes: 5,
          category: 'dexterity',
          owner: 'philippaclaire9',
          created_at: '2021-01-18T10:01:41.251Z',
        });
      });
  });

  test('Status 200, it ignores anything added on the request body after inc_votes ', () => {
    const reviewUpdate = { inc_votes: 2, name: 'Mitch' };
    return request(app)
      .patch('/api/reviews/2')
      .send(reviewUpdate)
      .expect(200)
      .then((response) => {
        expect(response.body.review).toEqual({
          review_id: 2,
          title: 'Jenga',
          review_body: 'Fiddly fun for all the family',
          designer: 'Leslie Scott',
          review_img_url:
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
          votes: 7,
          category: 'dexterity',
          owner: 'philippaclaire9',
          created_at: '2021-01-18T10:01:41.251Z',
        });
      });
  });

  test('Status 400, when provided with an invalid review id', () => {
    const reviewUpdate = {
      inc_votes: 1,
    };
    return request(app)
      .patch('/api/reviews/nonValidId')
      .send(reviewUpdate)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad Request');
      });
  });

  // this passes since it would be a code: '22P02' which is handled
  // and returns a 400
  test('Status 400, if given invalid inc_votes value', () => {
    const reviewUpdate = { inc_votes: 'cat' };
    return request(app)
      .patch('/api/reviews/2')
      .send(reviewUpdate)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad Request');
      });
  });

  test('Status 404, when provided with a review id that does not exist in the database', () => {
    const reviewUpdate = {
      inc_votes: 1,
    };
    const idNotInDatabase = 9999;
    return request(app)
      .patch(`/api/reviews/${idNotInDatabase}`)
      .send(reviewUpdate)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Not Found');
      });
  });
});
describe.only('GET /api/reviews/:review_id/comments', () => {
  test('Status 200, responds with an array of comments for the given review_id', () => {
    return request(app)
      .get('/api/reviews/2/comments')
      .expect(200)
      .then((response) => {
        expect(response.body.comments.length).toBe(3);
        response.body.comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            })
          );
        });
      });
  });

  test('Status 400, when provided with an invalid review id', () => {
    return request(app)
      .get('/api/reviews/nonValidId/comments')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad Request');
      });
  });

  test('Status 404, when provided with a review id that does not exist in the database', () => {
    const idNotInDatabase = 9999;
    return request(app)
      .get(`/api/reviews/${idNotInDatabase}/comments`)
      .expect(404)
      .then((response) => {
        console.log(response.body);
        expect(response.body.msg).toBe('Not Found');
      });
  });
});
describe('GET /api', () => {
  test('returns a json file representing all the endpoints', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          'GET /api': {
            description:
              'serves up a json representation of all the available endpoints of the api',
          },
          'GET /api/categories': {
            description: 'serves an array of all categories',
            queries: [],
            exampleResponse: {
              categories: [
                {
                  description:
                    "Players attempt to uncover each other's hidden role",
                  slug: 'Social deduction',
                },
              ],
            },
          },
          'GET /api/reviews': {
            description: 'serves an array of all reviews',
            queries: ['category', 'sort_by', 'order'],
            exampleResponse: {
              reviews: [
                {
                  title: 'One Night Ultimate Werewolf',
                  designer: 'Akihisa Okui',
                  owner: 'happyamy2016',
                  review_img_url:
                    'https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                  category: 'hidden-roles',
                  created_at: 1610964101251,
                  votes: 5,
                },
              ],
            },
          },
        });
      });
  });
});
