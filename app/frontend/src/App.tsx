import React from "react";
import { GlobalStyle } from "./components/GlobalStyle";
import { Layout } from "./components/Layout";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { TaskPage } from "./pages/Task/TaskPage";



export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Switch>
          <Route exact path="/" component={DashboardPage} />
          <Route exact path="/tasks/:taskId" component={TaskPage} />

        </Switch>

      </ThemeProvider>
    </BrowserRouter>

  );
};
