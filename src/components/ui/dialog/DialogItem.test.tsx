import { render, screen } from "@testing-library/react";

import DialogItem from "./DialogItem";

describe("Button", () => {
  test("renders the button with correct props", () => {
    const prop = {
      draggable: false,
      className: "custom-class",
      item: "item-1",
      id: "item-1",
    };

    render(<DialogItem {...prop}>Click me</DialogItem>);

    const itemElement = screen.getByText("Click me");

    expect(itemElement).toBeInTheDocument();
    expect(itemElement).toHaveAttribute("data-item", "item-1");
    expect(itemElement).toHaveAttribute("data-id", "item-1");
    expect(itemElement).toHaveClass("custom-class");
  });
});
