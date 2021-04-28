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
  objects.forEach(object => {
    const title = object.title;
    const id = object.review_id;
    referenceTable[title] = id;
  })
  return referenceTable;
}

exports.idFetcher = (comments, referenceTable) => {
  const newCommentsWithId = comments.map(comment => {
    const newComment = {...comment};
    const belongs_to = newComment.belongs_to;
    const review_id = referenceTable[belongs_to];
    delete newComment.belongs_to;
    newComment['review_id'] = review_id;
    console.log(newComment)
   return newComment;
   
  })
  return newCommentsWithId;
}