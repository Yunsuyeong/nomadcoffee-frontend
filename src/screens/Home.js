import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import PageTitle from "../components/PageTitle";
import Shop from "../components/shop/Shop";

const See_Shops_Query = gql`
  query seeCoffeeShops($lastId: Int!) {
    seeCoffeeShops(lastId: $lastId) {
      id
      name
      latitude
      longitude
      user {
        id
        username
        avatarURL
      }
      photos {
        id
        url
      }
      categories {
        id
        name
        slug
        totalShops
      }
      createdAt
    }
  }
`;

const AddButton = styled.button`
  width: 100%;
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  margin: 20px 0px;
  font-weight: 600;
  cursor: pointer;
`;

const Home = () => {
  const history = useHistory();
  const { data } = useQuery(See_Shops_Query, {
    variables: {
      lastId: 0,
    },
  });
  const onAddClick = () => {
    history.push(`/add`);
    window.location.reload();
  };
  return (
    <div>
      <PageTitle title="Home" />
      <AddButton onClick={onAddClick}>Add</AddButton>
      {data?.seeCoffeeShops?.map((shop) => (
        <Shop key={shop?.id} {...shop} />
      ))}
    </div>
  );
};

export default Home;
