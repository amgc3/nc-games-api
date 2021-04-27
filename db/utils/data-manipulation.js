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
  console.log(referenceTable);
  return referenceTable;
}

exports.idFetcher = (objects, referenceTable) => {
  const newObjects = objects.map(comment => {
    const newComment = {...comment};
    console.log(newComment);
    return newComment;
   
  })
  return newObjects
}