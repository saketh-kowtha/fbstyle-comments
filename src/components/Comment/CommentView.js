import styled from "styled-components";
import UserComment from "./UserComment";
import RepliedOn from "./RepliedOn";
import ReplyInput from "./ReplyInput";
import { useDispatch } from "react-redux";
import { addNewComment, deleteComment, toggleComment } from "../../actions";
import { useState } from "react";
import { Label, ProfileIcon } from "../../lib";

// import { BsThreeDots } from "react-icons/bs";
export default function CommentView({
  userDetails,
  onReply,
  replyingForThisThread,
  likes,
}) {
  const {
    icon,
    name,
    repliedMessage,
    repliedTime,
    isAuthorForPost,
    likedByAuthor,
  } = userDetails;

  const [shouldShowReply, setShowReply] = useState(false);

  const dispatch = useDispatch();

  const onComment = (reply) => {
    dispatch(addNewComment(repliedTime, reply));
    setShowReply(false);
  };

  const delteTheReply = (idx) => dispatch(deleteComment(idx));

  const toggleLike = (idx) => dispatch(toggleComment(idx));

  const commentActions = [
    {
      label: `${!likedByAuthor ? "Like" : "Unlike"} ${likes ? likes : " "}`,
      onClick: () => toggleLike(repliedTime),
    },
    {
      label: "Delete",
      onClick: () => delteTheReply(repliedTime),
    },
    {
      label: "Reply",
      onClick: () => {
        onReply(repliedTime);
        setShowReply(true);
      },
    },
  ];

  return (
    <Container>
      <ProfileIcon src={`/usericons/${icon}`} alt={name} />
      <div>
        <UserComment
          showAuthorTag={isAuthorForPost}
          userName={name}
          message={repliedMessage}
          likedByAuthor={likedByAuthor}
        />

        <Ul>
          {commentActions.map((action, idx) => (
            <Li key={idx}>
              <Label onClick={action.onClick}>{action.label}</Label>
            </Li>
          ))}
          <Li>
            <RepliedOn ts={repliedTime} />
          </Li>
        </Ul>

        {replyingForThisThread && shouldShowReply && (
          <ReplyInput
            autoFocus={true}
            onComment={onComment}
            name={name}
            icon={icon}
          />
        )}
      </div>
      {/* <Elipisis>
        <BsThreeDots />
      </Elipisis> */}
    </Container>
  );
}

//TODO: working on this
const Elipisis = styled.span`
  position: absolute;
  top: 18px;
  right: -20px;
`;

const Container = styled.div`
  display: inline-flex;
  position: relative;
  margin-top: 6px;
`;

// ${(props) =>
//   props.level > 0 &&
//   `
// ::before {
//   position: relative;
//   left: 10px;
//   top: 35px;
//   content: "";
//   border-left: 1px dashed #d8d8d8;
// }
// `};

const Ul = styled.ul`
  margin: 0 0 0 10px;
  padding: 0;
`;

const Li = styled.li`
  display: inline;
  list-style: none;
  :not(:last-child) {
    cursor: pointer;
    ::after {
      content: ".";
      margin: 0 4px;
    }
  }
`;
