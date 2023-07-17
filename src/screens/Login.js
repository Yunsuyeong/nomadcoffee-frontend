import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import PageTitle from "../components/PageTitle";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import FormError from "../components/auth/FormError";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 600;
  }
`;

const Login_Mutation = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setError,
  } = useForm({
    mode: "onChange",
  });
  const onCompleted = (data) => {
    const {
      login: { ok, token, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error ? error : "",
      });
    }
    if (token) {
      logUserIn(token);
    }
    console.log(token);
  };
  const [login, { loading }] = useMutation(Login_Mutation, { onCompleted });
  const onValid = ({ username, password }) => {
    if (loading) {
      return;
    }
    login({
      variables: {
        username,
        password,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Log in" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faMugSaucer} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("username", { required: "username is required" })}
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("password", {
              required: "password is required",
              minLength: 4,
            })}
            type="password"
            placeholder="Password"
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
};

export default Login;
