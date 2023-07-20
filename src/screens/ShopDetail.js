import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { FatText } from "../components/Shared";
import Input from "../components/auth/Input";
import { useState } from "react";
import Button from "../components/auth/Button";

const See_Shop_Query = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
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

const Edit_Shop_Mutation = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String
    $latitude: String
    $longitude: String
    $category: String
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      latitude: $latitude
      longitude: $longitude
      category: $category
    ) {
      ok
      error
    }
  }
`;

const ShopContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 5vh;
  left: 10vw;
  width: 80%;
  height: 90%;
  background-color: ${(props) => props.theme.bgColor};
`;

const ShopImg = styled.img`
  position: relative;
  width: 60%;
  border-right: 1px solid black;
`;

const ShopHeader = styled.div`
  display: flex;
  margin: 15px 10px;
`;

const Avatar = styled.img`
  height: 70px;
  width: 70px;
  background-color: #2c2c2c;
  margin-left: 10px;
  margin-right: 20px;
  border-radius: 50%;
`;

const Shopname = styled.h3`
  font-size: 24px;
  font-weight: 600;
`;

const ShopData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ShopContent = styled(FatText)`
  font-size: 20px;
  margin-left: 15px;
`;

const ShopFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 15px 10px;
`;

const EditButton = styled.button`
  width: 100%;
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  width: 100%;
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  cursor: pointer;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  margin-left: 15px;
`;

const ShopDetail = () => {
  const history = useHistory();
  const { id } = useParams();
  const shopId = +id;
  const { data } = useQuery(See_Shop_Query, {
    variables: {
      id: shopId,
    },
  });
  const shopData = data?.seeCoffeeShop;
  const Time = shopData?.createdAt;
  const formattedTime = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(Time);
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, setError, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      name: shopData?.name,
      latitude: shopData?.latitude,
      longitude: shopData?.longitude,
      category: shopData?.category,
    },
  });
  const onCompleted = (data) => {
    const { name, latitude, longitude, category } = getValues();
    const {
      editCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      console.log(error);
      return setError("result", { message: error ? error : "" });
    }
    history.push("/", {
      name,
      latitude,
      longitude,
      category,
    });
  };
  const [editShop, { loading }] = useMutation(Edit_Shop_Mutation, {
    onCompleted,
  });
  const onValid = ({ name, latitude, longitude, category }) => {
    if (loading) {
      return;
    }
    editShop({
      variables: {
        id: shopId,
        name,
        latitude,
        longitude,
        category,
      },
    });
  };
  return (
    <div>
      <PageTitle title="Detail" />
      <ShopContainer>
        <ShopImg src={shopData?.photos[0]?.url} />
        <div>
          <ShopHeader>
            <Avatar src={shopData?.user?.avatarURL} />
            <Shopname>{shopData?.name}</Shopname>
          </ShopHeader>
          <ShopData>
            <ShopContent>Owner : {shopData?.user?.username}</ShopContent>
            <ShopContent>Open : {formattedTime}</ShopContent>
            <ShopContent>
              Site : {shopData?.latitude}°, {shopData?.longitude}°
            </ShopContent>
            <ShopContent>Category :</ShopContent>
            <ShopContent>
              Introduction <br />
              This is the main page of NomadCoffee.
            </ShopContent>
          </ShopData>
          <ShopFooter>
            <EditButton onClick={() => setEditMode((prev) => !prev)}>
              Edit
            </EditButton>
            <DeleteButton>Delete</DeleteButton>
          </ShopFooter>
          {editMode && (
            <EditForm onSubmit={handleSubmit(onValid)}>
              <Input
                {...register("name", { required: true })}
                type="text"
                placeholder="Name"
              />
              <Input
                {...register("latitude", { required: true })}
                type="text"
                placeholder="Latitude"
              />
              <Input
                {...register("longitude", { required: true })}
                type="text"
                placeholder="Longitude"
              />
              <Input
                {...register("category")}
                type="text"
                placeholder="Category"
              />
              <Button
                type="submit"
                value={loading ? "Loading..." : "Edit shop"}
              />
            </EditForm>
          )}
        </div>
      </ShopContainer>
    </div>
  );
};

export default ShopDetail;
