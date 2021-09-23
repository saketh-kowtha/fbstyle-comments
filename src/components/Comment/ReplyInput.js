import styled from "styled-components";
import { VscSmiley } from "react-icons/vsc";
import { AiFillCamera, AiOutlineGif } from "react-icons/ai";
import { BiSticker } from "react-icons/bi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getAllAuthors } from "../../utils";
import { Input, ProfileIcon } from "../../lib";

export default function ReplyInput({ name, icon, onComment, autoFocus }) {
  const [comment, setComment] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const { replies, author } = useSelector((state) => state.commentWidget);

  const users = getAllAuthors(replies, author);

  const onSubmit = (e) => {
    e.preventDefault();
    onComment({
      message: comment,
      idx: new Date(),
      authorName: name,
    });
    setComment("");
  };

  const inputHandler = (e) => {
    const value = e.target.value;
    setComment(value);
    if (value[value.length - 1] === "@") {
      const query = value.substring(value.lastIndexOf("@") + 1);
      setFilteredList(
        users.filter((user) => user.startsWith(query) || query === "@")
      );
    }
  };

  const handleOptionSelection = (user) => {
    setComment(comment + `${user} `);
    setFilteredList([]);
  };

  return (
    <form onSubmit={onSubmit}>
      <Container>
        <ProfileIcon src={`/usericons/${icon}`} alt={name} />
        <InputContainer>
          <Input
            type="text"
            autoFocus={autoFocus}
            onChange={inputHandler}
            value={comment}
            placeholder="Write a comment"
          />

          {filteredList !== null && (
            <DataList>
              {filteredList.map((user) => (
                <Option onClick={() => handleOptionSelection(user)}>
                  {user}
                </Option>
              ))}
            </DataList>
          )}
        </InputContainer>

        <IconContainer>
          <VscSmiley />
          <AiFillCamera />
          <AiOutlineGif />
          <BiSticker />
        </IconContainer>
      </Container>
    </form>
  );
}

const InputContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const Option = styled.li`
  margin: 0;
  padding: 8px;
  list-style: none;
  font-size: ${(props) => props.theme.fontSizes.medium};
  cursor: pointer;
  border-bottom: 1px solid ${(props) => props.theme.color.dividerColor};
  :hover {
    background-color: ${(props) =>
      props.theme.color.dataListHoverBackgroundColor};
  }
`;

const DataList = styled.ul`
  position: absolute;
  top: 20px;
  z-index: 1;
  background-color: ${(props) => props.theme.color.dataListBackgroundColor};
  min-width: 250px;
  box-shadow: 0 4px 8px 0 ${(props) => props.theme.color.boxShadowColor};
  transition: 0.3s;
  border-radius: 5px;
  padding: 0px;
  max-height: 250px;
  overflow-y: scroll;
`;

const Container = styled.div`
  display: flex;
  margin-top: 4px;
`;

const IconContainer = styled.div`
  position: relative;
  display: flex;
  right: 110px;
  top: 12px;
  svg {
    cursor: pointer;
    margin: 0 4px;
    fill: ${(props) => props.theme.color.grey};
  }
`;
