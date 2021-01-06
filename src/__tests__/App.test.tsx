import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import AriaLabels from "../utils/AriaLabels";

test("renders learn react link", async () => {
  render(<App />);
  const linkElement = await screen.findAllByLabelText(AriaLabels.pokeItem);
  console.log(linkElement);
  // expect(linkElement).toBeInTheDocument();
});
