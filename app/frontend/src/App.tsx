import React from "react";
import { GlobalStyle } from "./components/GlobalStyle";
import { Layout } from "./components/Layout";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <DashboardPage />
      </Layout>
    </ThemeProvider>
  );
};
