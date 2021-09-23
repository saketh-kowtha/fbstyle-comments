import { useSelector } from "react-redux";
import Reply from "../components/Comment/ReplyThread";

//Fetching comments from the redux store and passing it to the ReplyThread component
export default function CommentWidget({}) {
  const { replies, author, idx } = useSelector((state) => state.commentWidget);

  return <Reply replies={replies} author={author} rootId={idx} />;
}
