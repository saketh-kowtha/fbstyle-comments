import styled from "styled-components";

const Label = styled.label`
  font-weight: 800;
  font-size: ${(props) => props.theme.fontSizes.xsmall};
  color: ${(props) => props.theme.color.labelTextColor};
  cursor: inherit;
  :hover {
    text-decoration: underline;
  }
`;

export default Label;
