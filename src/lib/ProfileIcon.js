import styled from "styled-components";

const ProfileIcon = styled.img`
  border-radius: 50%;
  height: 35px;
  width: 35px;
  boredr: 1px solid ${(props) => props.theme.color.profileImageBorder};
  margin-right: 5px;
  margin-top: 2px;
`;

export default ProfileIcon;
