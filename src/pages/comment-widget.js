import { useSelector } from "react-redux";
import Reply from "../components/Comment/ReplyThread";

export default function CommentWidget() {
  const { replies, author, idx } = useSelector((state) => state.commentWidget);

  return <Reply replies={replies} author={author} rootId={idx} />;
}
