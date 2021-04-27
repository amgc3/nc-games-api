// extract any functions you are using to manipulate your data, into this file

exports.keyReplacer = (commentObject, keyToReplace, newKey) => {
  const newCommentObject = {};
  Object.assign(newCommentObject, commentObject);
  newCommentObject[newKey] = newCommentObject[keyToReplace];
  delete newCommentObject[keyToReplace];
  return newCommentObject;
};
