import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "black",
  bgColor: "whitesmoke",
  accent: "#0095f6",
  borderColor: "rgb(219,219,219)",
};

export const darkTheme = {
  fontColor: "whitesmoke",
  bgColor: "black",
  accent: "#90EE90",
  borderColor: "",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
  input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
        color:${(props) => props.theme.fontColor};
        background-color: ${(props) => props.theme.bgColor};
        font-size:14px;
        font-family:'Open Sans', sans-serif;
    }
    a {
      color:inherit;
      text-decoration: none;
    }
`;
