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
  test('Status: 200 responds with a JSON object containing the reviews', () => {
    return request(app)
      .get('/api/reviews')
      .expect(200)
      .then((response) => {
        expect(response.body.reviews).toEqual([
          {
            review_id: 1,
            title: 'Agricola',
            review_body: 'Farmyard fun!',
            designer: 'Uwe Rosenberg',
            review_img_url:
              'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            votes: 1,
            category: 'euro game',
            owner: 'mallionaire',
            created_at: '2021-01-18T10:00:20.514Z',
          },
          {
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
          },
          {
            review_id: 3,
            title: 'Ultimate Werewolf',
            review_body: "We couldn't find the werewolf!",
            designer: 'Akihisa Okui',
            review_img_url:
              'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            votes: 5,
            category: 'social deduction',
            owner: 'bainesface',
            created_at: '2021-01-18T10:01:41.251Z',
          },
          {
            review_id: 4,
            title: 'Dolor reprehenderit',
            review_body:
              'Consequat velit occaecat voluptate do. Dolor pariatur fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat et adipisicing laborum do. Sint sit tempor officia pariatur duis ullamco labore ipsum nisi voluptate nulla eu veniam. Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip. Cillum aliquip quis aute enim anim ex laborum officia. Aliqua magna elit reprehenderit Lorem elit non laboris irure qui aliquip ad proident. Qui enim mollit Lorem labore eiusmod',
            designer: 'Gamey McGameface',
            review_img_url:
              'https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            votes: 7,
            category: 'social deduction',
            owner: 'mallionaire',
            created_at: '2021-01-22T11:35:50.936Z',
          },
          {
            review_id: 5,
            title: 'Proident tempor et.',
            review_body:
              'Labore occaecat sunt qui commodo anim anim aliqua adipisicing aliquip fugiat. Ad in ipsum incididunt esse amet deserunt aliqua exercitation occaecat nostrud irure labore ipsum. Culpa tempor non voluptate reprehenderit deserunt pariatur cupidatat aliqua adipisicing. Nostrud labore dolor fugiat sint consequat excepteur dolore irure eu. Anim ex adipisicing magna deserunt enim fugiat do nulla officia sint. Ex tempor ut aliquip exercitation eiusmod. Excepteur deserunt officia voluptate sunt aliqua esse deserunt velit. In id non proident veniam ipsum id in consequat duis ipsum et incididunt. Qui cupidatat ea deserunt magna proident nisi nulla eiusmod aliquip magna deserunt fugiat fugiat incididunt. Laboris nisi velit mollit ullamco deserunt eiusmod deserunt ea dolore veniam.',
            designer: 'Seymour Buttz',
            review_img_url:
              'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
            votes: 5,
            category: 'social deduction',
            owner: 'mallionaire',
            created_at: '2021-01-07T09:06:08.077Z',
          },
          {
            review_id: 6,
            title: 'Occaecat consequat officia in quis commodo.',
            review_body:
              'Fugiat fugiat enim officia laborum quis. Aliquip laboris non nulla nostrud magna exercitation in ullamco aute laborum cillum nisi sint. Culpa excepteur aute cillum minim magna fugiat culpa adipisicing eiusmod laborum ipsum fugiat quis. Mollit consectetur amet sunt ex amet tempor magna consequat dolore cillum adipisicing. Proident est sunt amet ipsum magna proident fugiat deserunt mollit officia magna ea pariatur. Ullamco proident in nostrud pariatur. Minim consequat pariatur id pariatur adipisicing.',
            designer: 'Ollie Tabooger',
            review_img_url:
              'https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            votes: 8,
            category: 'social deduction',
            owner: 'mallionaire',
            created_at: '2020-09-13T15:19:28.077Z',
          },
          {
            review_id: 7,
            title: 'Mollit elit qui incididunt veniam occaecat cupidatat',
            review_body:
              'Consectetur incididunt aliquip sunt officia. Magna ex nulla consectetur laboris incididunt ea non qui. Enim id eiusmod irure dolor ipsum in tempor consequat amet ullamco. Occaecat fugiat sint fugiat mollit consequat pariatur consequat non exercitation dolore. Labore occaecat in magna commodo anim enim eiusmod eu pariatur ad duis magna. Voluptate ad et dolore ullamco anim sunt do. Qui exercitation tempor in in minim ullamco fugiat ipsum. Duis irure voluptate cupidatat do id mollit veniam culpa. Velit deserunt exercitation amet laborum nostrud dolore in occaecat minim amet nostrud sunt in. Veniam ut aliqua incididunt commodo sint in anim duis id commodo voluptate sit quis.',
            designer: 'Avery Wunzboogerz',
            review_img_url:
              'https://images.pexels.com/photos/278888/pexels-photo-278888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            votes: 9,
            category: 'social deduction',
            owner: 'mallionaire',
            created_at: '2021-01-25T11:16:54.963Z',
          },
          {
            review_id: 8,
            title: 'One Night Ultimate Werewolf',
            review_body: "We couldn't find the werewolf!",
            designer: 'Akihisa Okui',
            review_img_url:
              'https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            votes: 5,
            category: 'social deduction',
            owner: 'mallionaire',
            created_at: '2021-01-18T10:01:41.251Z',
          },
          {
            review_id: 9,
            title: 'A truly Quacking Game; Quacks of Quedlinburg',
            review_body:
              "Ever wish you could try your hand at mixing potions? Quacks of Quedlinburg will have you mixing up a homebrew like no other. Each player buys different ingredients (chips) that are drawn at random to reach the most points, but watch out, you'd better not let your cauldrom explode.",
            designer: 'Wolfgang Warsch',
            review_img_url:
              'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
            votes: 10,
            category: 'social deduction',
            owner: 'mallionaire',
            created_at: '2021-01-18T10:01:41.251Z',
          },
          {
            review_id: 10,
            title: 'Build you own tour de Yorkshire',
            review_body:
              'Cold rain pours on the faces of your team of cyclists, you pulled to the front of the pack early and now your taking on exhaustion cards like there is not tomorrow, you think there are about 2 hands left until you cross the finish line, will you draw enough from your deck to cross before the other team shoot passed? Flamee Rouge is a Racing deck management game where you carefully manage your deck in order to cross the line before your opponents, cyclist can fall slyly behind front runners in their slipstreams to save precious energy for the prefect moment to burst into the lead ',
            designer: 'Asger Harding Granerud',
            review_img_url:
              'https://images.pexels.com/photos/258045/pexels-photo-258045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            votes: 10,
            category: 'social deduction',
            owner: 'mallionaire',
            created_at: '2021-01-18T10:01:41.251Z',
          },
          {
            review_id: 11,
            title: "That's just what an evil person would say!",
            review_body:
              "If you've ever wanted to accuse your siblings, cousins or friends of being part of a plot to murder everyone whilst secretly choosing which one of them should get the chop next - this is the boardgame for you. Buyer beware: once you gain a reputation for being able to lie with a stone face about being the secret killer you may never lose it.",
            designer: 'Fiona Lohoar',
            review_img_url:
              'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
            votes: 8,
            category: 'social deduction',
            owner: 'mallionaire',
            created_at: '2021-01-18T10:01:41.251Z',
          },
          {
            review_id: 12,
            title: "Scythe; you're gonna need a bigger table!",
            review_body:
              'Spend 30 minutes just setting up all of the boards (!) meeple and decks, just to forget how to play. Scythe can be a lengthy game but really packs a punch if you put the time in. With beautiful artwork, countless scenarios and clever game mechanics, this board game is a must for any board game fanatic; just make sure you explain ALL the rules before you start playing with first timers or you may find they bring it up again and again.',
            designer: 'Jamey Stegmaier',
            review_img_url:
              'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
            votes: 100,
            category: 'social deduction',
            owner: 'mallionaire',
            created_at: '2021-01-22T10:37:04.839Z',
          },
          {
            review_id: 13,
            title: "Settlers of Catan: Don't Settle For Less",
            review_body:
              'You have stumbled across an uncharted island rich in natural resources, but you are not alone; other adventurers have come ashore too, and the race to settle the island of Catan has begun! Whether you exert military force, build a road to rival the Great Wall, trade goods with ships from the outside world, or some combination of all three, the aim is the same: to dominate the island. Will you prevail? Proceed strategically, trade wisely, and may the odds be in favour.',
            designer: 'Klaus Teuber',
            review_img_url:
              'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
            votes: 16,
            category: 'social deduction',
            owner: 'mallionaire',
            created_at: '1970-01-10T03:08:38.400Z',
          },
        ]);
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
