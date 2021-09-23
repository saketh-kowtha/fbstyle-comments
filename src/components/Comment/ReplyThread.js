import CommentView from "./CommentView";
import ReplyInput from "./ReplyInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewComment } from "../../actions";
import { totalComments } from "../../utils";
import styled from "styled-components";
import { Label } from "../../lib";

export default function Reply({ replies, level = 0, author, idx }) {
  const [replyFor, setReplyFor] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const dispatch = useDispatch();

  const replyClickHandler = (idx) => setReplyFor(idx);

  const onComment = (commentDetails) => {
    dispatch(addNewComment(idx, commentDetails));
  };

  const totalCommentsCount = totalComments(replies);

  const doesRepliesAreMoreThanOne =
    totalCommentsCount > 1 && replies.length > 1;

  const toggleComments = () => setShowAll(!showAll);

  const isRootLevelReply = level === 0;

  const showOrHideCommentsLabel = showAll ? "Hide " : "View ";

  const commentsListToShow =
    !doesRepliesAreMoreThanOne || showAll ? replies : [replies[0]];

  return (
    <>
      {isRootLevelReply && (
        <ReplyInput onComment={onComment} name={author} icon={"fallback.svg"} />
      )}

      {doesRepliesAreMoreThanOne && (
        <ViewAllCommentsContainer level={level}>
          <Label onClick={toggleComments}>
            {showOrHideCommentsLabel} Other {totalCommentsCount - 1} replies
          </Label>
        </ViewAllCommentsContainer>
      )}

      {commentsListToShow.map((currentReply) => {
        const commentViewProps = {
          userDetails: {
            icon: currentReply.icon || "fallback.svg",
            name: currentReply.authorName,
            repliedMessage: currentReply.message,
            repliedTime: currentReply.idx,
            isAuthorForPost: currentReply.authorName === author,
            likedByAuthor: currentReply.likedByAuthor,
          },
          likes: currentReply.likes,
          onReply: replyClickHandler,
          level,
        };

        return (
          <Container level={level} key={currentReply.idx}>
            <CommentView
              replyingForThisThread={replyFor === currentReply.idx}
              {...commentViewProps}
            />
            {currentReply.replies && (
              <Reply
                replies={currentReply.replies}
                level={level + 1}
                idx={replies[replies.length - 1]?.idx}
              />
            )}
          </Container>
        );
      })}
    </>
  );
}

const Container = styled.div`
  margin-left: 20px;
  position: relative;
`;

const ViewAllCommentsContainer = styled.div`
  margin: 2px 0 2px ${(props) => props.level * 35}px;
  padding-left: 16px;
`;
