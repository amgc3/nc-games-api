const { unixGetter } = require('../db/utils/data-manipulation');

describe('unixGetter', () => {
  it('returns a date string when given an object with a created_at key with value a unix timestamp', () => {
    const reviewData = {
      title: 'Culture a Love of Agriculture With Agricola',
      designer: 'Uwe Rosenberg',
      owner: 'tickle122',
      review_img_url:
        'https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      review_body:
        "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
      category: 'strategy',
      created_at: 1610964020514,
      votes: 1,
    };
    expect(unixGetter(reviewData)).toBe('2021-01-18T10:00:20.514Z');
  });
});
