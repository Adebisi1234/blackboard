import { render, screen } from "@testing-library/react";
import Icon from "./Icon";

describe("Icon", () => {
  test("renders the icon with correct props", () => {
    const prop = {
      className: "custom-class",
      children: "Icon",
    };

    render(<Icon {...prop} />);

    const iconElement = screen.getByText("Icon");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass("custom-class");
  });
});
