export const addNewComment = (insertAfter, commentDetails) => ({
  type: "ADD_NEW_COMMENT",
  insertAfter,
  comment: commentDetails,
});

export const deleteComment = (idx) => ({
  type: "DELETE_COMMENT",
  idx,
});

export const toggleComment = (idx) => ({ type: "TOGGLE_LIKE", idx });
