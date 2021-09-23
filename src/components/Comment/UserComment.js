import styled from "styled-components";
import { GrArticle } from "react-icons/gr";
import { AiFillLike } from "react-icons/ai";

export default function UserComment({
  userName,
  message,
  showAuthorTag,
  likedByAuthor,
}) {
  return (
    <>
      <Container>
        <Author>
          {userName} {showAuthorTag && <GrArticle />}
        </Author>
        <Comment>{message}</Comment>
        {likedByAuthor && (
          <Likes>
            <LikeIcon />
            <LikesCount>2</LikesCount>
          </Likes>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: inline-block;
  position: relative;
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.color.grey2};
  margin: 0 0 4px 0px;
`;

const LikesCount = styled.label`
  font-size: ${(props) => props.theme.fontSizes.xsmall};
  margin-left: 2px;
`;

const LikeIcon = styled(AiFillLike)`
  color: ${(props) => props.theme.color.blue};
`;

const Likes = styled.span`
  display: inline-flex;
  align-items: center;
  position: absolute;
  box-shadow: 0 4px 8px 0 ${(props) => props.theme.color.boxShadowColor};
  background-color: ${(props) => props.theme.color.white};
  border-radius: 50px;
  right: -10px;
  top: 16px;
  border-radius: 50px;
  width: 20px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.medium};
  padding: 4px;
`;

const Author = styled.h5`
  font-size: ${(props) => props.theme.fontSizes.medium};
  margin: 0;
`;

const Comment = styled.p`
  font-size: ${(props) => props.theme.fontSizes.medium};
  margin: 2px 0px;
`;
