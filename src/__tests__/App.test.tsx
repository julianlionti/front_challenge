import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import AriaLabels from "../utils/AriaLabels";

test("renders list and detail", async () => {
  render(<App />);

  await waitFor(() => {
    expect(
      screen.getAllByLabelText(AriaLabels.pokeItem).length
    ).toBeGreaterThan(0);
  });

  const items = screen.getAllByLabelText(AriaLabels.pokeItem);
  expect(items.length).toBe(5);

  const [firstPoke] = items;
  fireEvent.click(firstPoke);

  await waitFor(() => {
    expect(screen.getByLabelText(AriaLabels.pokeDetail)).toBeInTheDocument();
  });
});
