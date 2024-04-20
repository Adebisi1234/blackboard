import { render, screen, fireEvent } from "@testing-library/react";
import Canvas from "./Canvas";

describe("Canvas", () => {
  test("renders the canvas component", () => {
    render(<Canvas />);
    const canvasElement = screen.getByTestId("canvas");
    expect(canvasElement).toBeInTheDocument();
  });

  test("handles pointer down event", () => {
    render(<Canvas />);
    const canvasElement = screen.getByTestId("canvas");
    fireEvent.pointerDown(canvasElement);
    // Add your assertions here
  });

  test("handles pointer move event", () => {
    render(<Canvas />);
    const canvasElement = screen.getByTestId("canvas");
    fireEvent.pointerMove(canvasElement);
    // Add your assertions here
  });

  test("handles pointer up event", () => {
    render(<Canvas />);
    const canvasElement = screen.getByTestId("canvas");
    fireEvent.pointerUp(canvasElement);
    // Add your assertions here
  });
});
