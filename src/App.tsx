import { CssBaseline } from "@material-ui/core";
import React from "react";
import Home from "./screens/Home";
import { LangProvider } from "./utils/LangContext";

export default () => (
  <LangProvider>
    <CssBaseline />
    <Home />
  </LangProvider>
);
