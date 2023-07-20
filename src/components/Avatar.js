import styled from "styled-components";

const SAvatar = styled.div`
  width: 30px;
  height: 30px;
  background-color: #2c2c2c;
  border-radius: 15px;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar = ({ url = "" }) => {
  return <SAvatar>{url !== "" ? <Img src={url} /> : null}</SAvatar>;
};

export default Avatar;
