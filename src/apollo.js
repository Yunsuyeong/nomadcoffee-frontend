import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  window.location.reload();
};

export const darkModeVar = makeVar(
  Boolean(localStorage.getItem(DARK_MODE) === "on")
);

export const darkModeOn = () => {
  localStorage.setItem(DARK_MODE, "on");
  darkModeVar(true);
};

export const darkModeOff = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
