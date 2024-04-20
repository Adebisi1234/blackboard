import { render, screen } from "@testing-library/react";
import CompOverlay from "./CompOverlay";

describe("CompOverlay", () => {
  test("renders the arrow component correctly", () => {
    const prop = {
      type: "arrow" as const,
      id: 0,
      opacity: 1,
    };

    render(<CompOverlay {...prop} />);

    const arrowElement = screen.getByTestId(0);

    expect(arrowElement).toBeInTheDocument();
    expect(arrowElement).toHaveAttribute("data-comp", "arrow");
    expect(arrowElement).toHaveAttribute("data-comp-id", 0);
    expect(arrowElement).toHaveClass("adjust");
  });

  test("renders the pencil component correctly", () => {
    const prop = {
      type: "pencil" as const,
      id: 1,
      opacity: 1,
    };

    render(<CompOverlay {...prop} />);

    const pencilElement = screen.getByTestId(1);

    expect(pencilElement).toBeInTheDocument();
    expect(pencilElement).toHaveAttribute("data-comp", "pencil");
    expect(pencilElement).toHaveAttribute("data-comp-id", 1);
    expect(pencilElement).toHaveClass("adjust");
  });

  test("renders the square component correctly", () => {
    const prop = {
      type: "image" as const,
      id: 2,
      opacity: 1,
    };

    render(<CompOverlay {...prop} />);

    const imageElement = screen.getByTestId(2);

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("data-comp", "image");
    expect(imageElement).toHaveAttribute("data-comp-id", 2);
    expect(imageElement).toHaveClass("adjust");
  });
});
