// extract any functions you are using to manipulate your data, into this file
exports.unixGetter = (created_at) => {
  const dateString = new Date(created_at);
  return dateString;
};
// const dateConverter = new Date(unixTimeStamp).toISOString();
// unixGetter({
//     title: 'Culture a Love of Agriculture With Agricola',
//     designer: 'Uwe Rosenberg',
//     owner: 'tickle122',
//     review_img_url:
//       'https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//     review_body:
//       "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
//     category: 'strategy',
//     created_at: 1610964020514,
//     votes: 1,
//   });
//console.log(unixGetter(1610964020514));
