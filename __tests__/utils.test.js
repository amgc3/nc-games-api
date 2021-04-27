const { keyReplacer, makeReference, idFetcher } = require('../db/utils/data-manipulation');

describe('keyReplacer', () => {
  test('returns a new empty object when passed an empty object', () => {
    const testObject = {};
    expect(keyReplacer(testObject)).toEqual({});
    expect(keyReplacer(testObject)).not.toBe(testObject);
  });
  test('should return new object with keyToReplace replaced with newKey', () => {
    const testObject = {
      body: 'I loved this game too!',
      belongs_to: 'Jenga',
      created_by: 'bainesface',
      votes: 16,
      created_at: 1511354613389,
    };
    const keyToReplace = 'created_by';
    const newKey = 'author';
    expect(keyReplacer(testObject, keyToReplace, newKey)).toEqual({
      body: 'I loved this game too!',
      belongs_to: 'Jenga',
      author: 'bainesface',
      votes: 16,
      created_at: 1511354613389,
    });
    expect(keyReplacer(testObject)).not.toBe(testObject);
  });
});

describe('makeReference', () => {
  test('returns an empty object if given an empty array', () => {
    const input = [];
    expect(makeReference(input)).toEqual({});
  });
  test('returns a reference table if given an array of 2 objects', () => {
    const input = [{
      review_id: 1,
      title: "Agricola",
      designer: "Uwe Rosenberg",
      owner: "mallionaire",
      review_body: "Farmyard fun!",
      category: "euro game",
      created_at: 1610964020514,
      votes: 1,
      review_img_url:
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
    },
    {
      review_id: 2,
      title: "Jenga",
      designer: "Leslie Scott",
      owner: "philippaclaire9",
      review_body: "Fiddly fun for all the family",
      category: "dexterity",
      created_at: 1610964101251,
      votes: 5,
      review_img_url:
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
    }];
    expect(makeReference(input)).toEqual({Agricola: 1, Jenga: 2 })
  })
});
describe('idFetcher', () => {
  test('returns a new array of objects', () => {
    const input = [{}, {}];
    const ref = {
      Agricola: 1,
      Jenga: 2,
      'Ultimate Werewolf': 3,
      'Dolor reprehenderit': 4,
      'Proident tempor et.': 5,
      'Occaecat consequat officia in quis commodo.': 6,
      'Mollit elit qui incididunt veniam occaecat cupidatat': 7,
      'One Night Ultimate Werewolf': 8,
      'A truly Quacking Game; Quacks of Quedlinburg': 9,
      'Build you own tour de Yorkshire': 10,
      "That's just what an evil person would say!": 11,
      "Scythe; you're gonna need a bigger table!": 12,
      "Settlers of Catan: Don't Settle For Less": 13
    }
    expect(idFetcher(input, ref)).not.toBe(input);
    expect(idFetcher(input, ref)).toHaveLength(2);
  })
})
