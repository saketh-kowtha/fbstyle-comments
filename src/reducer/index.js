import { deleteComment, toggleLike, addNewReply } from "../utils";

export default function commentWidgetReducer(state, action) {
  switch (action.type) {
    case "ADD_NEW_COMMENT":
      addNewReply(state, action.insertAfter, action.comment);
      return { ...state };

    case "DELETE_COMMENT":
      deleteComment(state, action.idx);
      return { ...state };

    case "TOGGLE_LIKE":
      toggleLike(state, action.idx);
      return { ...state };
    default:
      return { ...state };
  }
}
