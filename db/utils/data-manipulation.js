// extract any functions you are using to manipulate your data, into this file

exports.keyReplacer = (commentObject, keyToReplace, newKey) => {
  const newCommentObject = {};
  Object.assign(newCommentObject, commentObject);
  newCommentObject[newKey] = newCommentObject[keyToReplace];
  delete newCommentObject[keyToReplace];
  return newCommentObject;
};

exports.makeReference = (objects) => {
  const referenceTable = {};
  objects.forEach((object) => {
    const title = object.title;
    const id = object.review_id;
    referenceTable[title] = id;
  });
  return referenceTable;
};

exports.idFetcher = (comments, referenceTable) => {
  const newCommentsWithId = comments.map(({ belongs_to, ...comment }) => {
    const review_id = referenceTable[belongs_to];
    const newComment = { ...comment, review_id };
    return newComment;
  });
  return newCommentsWithId;
};
