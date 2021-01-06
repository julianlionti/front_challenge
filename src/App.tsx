import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import React from "react";
import Home from "./screens/Home";
import { LangProvider } from "./utils/LangContext";

export default () => (
  <LangProvider>
    <ThemeProvider theme={createMuiTheme({ palette: { primary: red } })}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  </LangProvider>
);
