import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  border-radius: 50px;
  border: none;
  padding: 5px 10px;
  font-size: ${(props) => props.theme.fontSizes.medium};
  outline: none;
  background-color: ${(props) => props.theme.color.inputBackgroundColor};
  min-width: 250px;
  border: 1px solid ${(props) => props.theme.color.inputBorderColor};
`;

export default Input;
