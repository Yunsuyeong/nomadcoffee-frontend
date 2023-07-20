import { useForm } from "react-hook-form";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const AddContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 5px;
`;

const AddForm = styled.form`
  width: 30vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 12px;
`;

const Create_Shop_Mutation = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $category: String
  ) {
    createCoffeeShop(
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

const AddShop = () => {
  const history = useHistory();
  const { register, handleSubmit, setError } = useForm();
  const onCompleted = (data) => {
    const {
      createCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      console.log(error);
      return setError("result", { message: error ? error : "" });
    }
    history.push("/");
    window.location.reload();
  };
  const [createShop, { loading }] = useMutation(Create_Shop_Mutation, {
    onCompleted,
  });
  const onValid = ({ name, latitude, longitude, category }) => {
    if (loading) {
      return;
    }
    createShop({
      variables: {
        name,
        latitude,
        longitude,
        category,
      },
    });
  };
  return (
    <div>
      <PageTitle title="add" />
      <AddContainer>
        <AddForm onSubmit={handleSubmit(onValid)}>
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
          <Input {...register("category")} type="text" placeholder="Category" />
          <Button type="submit" value={loading ? "Loading..." : "Add shop"} />
        </AddForm>
      </AddContainer>
    </div>
  );
};

export default AddShop;
