import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ApplicationContextProvider } from "./contexts/ApplicationContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Container = styled(App)(() => ({
  marginLeft: "50px",
}));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ApplicationContextProvider>
        <Container />
      </ApplicationContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
