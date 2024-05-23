import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  test("renders the button with correct props", () => {
    const prop = {
      draggable: false,
      className: "custom-class",
      tool: "tool-1",
      id: "button-1",
    };

    render(<Button {...prop}>Click me</Button>);

    const buttonElement = screen.getByText("Click me");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("data-tool", "tool-1");
    expect(buttonElement).toHaveAttribute("data-id", "button-1");
    expect(buttonElement).toHaveClass("custom-class");
  });
});
