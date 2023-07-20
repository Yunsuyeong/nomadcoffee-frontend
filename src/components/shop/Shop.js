import styled from "styled-components";
import { FatText } from "../Shared";
import Avatar from "../Avatar";
import { Link, useHistory } from "react-router-dom";

const ShopsContainer = styled.div`
  max-width: 615px;
  background-color: #66e0ff;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  padding-bottom: 20px;
`;

const ShopHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 15px;
  cursor: pointer;
`;

const Shopname = styled(FatText)`
  margin-left: 15px;
`;

const ShopImg = styled.img`
  min-width: 70%;
  max-width: 20vw;
  height: 50%;
`;

const InfoContainer = styled.div`
  margin-top: 20px;
`;

const Owner = styled(FatText)`
  margin-left: 10px;
`;

const Shop = ({ id, name, latitude, longitude, user, photos, createdAt }) => {
  const history = useHistory();
  const onShopClick = () => {
    history.push(`/shop/${id}`);
    window.location.reload();
  };
  return (
    <ShopsContainer key={id}>
      <ShopHeader>
        <Avatar url={photos?.url} />
        <Shopname onClick={onShopClick}>{name}</Shopname>
      </ShopHeader>
      <ShopImg src={photos[0]?.url} />
      <InfoContainer>
        <Owner>Owner : {user?.username}</Owner>
      </InfoContainer>
    </ShopsContainer>
  );
};

export default Shop;
