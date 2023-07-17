import { useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import PageTitle from "../components/PageTitle";
import FormBox from "../components/auth/FormBox";
import { styled } from "styled-components";
import { FatLink } from "../components/Shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const Create_Account_Mutation = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(username: $username, email: $email, password: $password) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid },
    setError,
  } = useForm();
  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", { message: error ? error : "" });
    }
    history.push("/", {
      message: "Account created. Please log in",
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation(Create_Account_Mutation, {
    onCompleted,
  });
  const onValid = ({ username, email, password }) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        username,
        email,
        password,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faMugSaucer} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("username", { required: "username is required" })}
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("email", { required: "email is required" })}
            type="text"
            placeholder="Email"
          />
          <Input
            {...register("password", {
              required: "password is required",
              minLength: 4,
            })}
            type="text"
            placeholder="Password"
          />
          <Button type="submit" disabled={!isValid || loading} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
};

export default SignUp;
