import {
  render,
  screen,
  fireEvent,
  renderHook,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import BackToContent from "./BackToContent";
import { useCanvas } from "../../store/Store";

describe("BackToContent", () => {
  test("renders the button", () => {
    const { setCanvasPos } = renderHook(() => useCanvas()).result.current;

    act(() => {
      setCanvasPos({ x: 400, y: 400 });
    });
    render(<BackToContent />);
    const buttonElement = screen.queryByText("Back to Content");
    expect(buttonElement).toBeInTheDocument();
  });

  test("resets canvas position when button is clicked", () => {
    const { setCanvasPos, setRef } = renderHook(() => useCanvas()).result
      .current;
    const canvas = document.createElement("div");
    canvas.style.transform = "translate(400,400)";
    act(() => {
      setCanvasPos({ x: 400, y: 400 });
      setRef(canvas);
    });
    render(<BackToContent />);
    const buttonElement = screen.getByText("Back to Content");
    fireEvent.pointerDown(buttonElement);
    const { canvasPos } = renderHook(() => useCanvas()).result.current;
    expect(canvasPos).toEqual({ x: 0, y: 0 });
    expect(canvas.style.transform).toBe("translate(0,0)");
  });

  test("does not reset canvas position when canvasRef is not available", () => {
    const { setCanvasPos, setRef } = renderHook(() => useCanvas()).result
      .current;

    act(() => {
      setCanvasPos({ x: 400, y: 400 });
      setRef(undefined!);
    });
    render(<BackToContent />);
    const buttonElement = screen.getByText("Back to Content");
    fireEvent.pointerDown(buttonElement);
    const { canvasPos } = renderHook(() => useCanvas()).result.current;
    expect(canvasPos).toEqual({ x: 400, y: 400 });
  });

  test("does not render the button when canvas position is within range", () => {
    const { setCanvasPos } = renderHook(() => useCanvas()).result.current;

    act(() => {
      setCanvasPos({ x: 100, y: 100 });
    });
    render(<BackToContent />);
    const buttonElement = screen.queryByText("Back to Content");

    expect(buttonElement).toBeNull();
  });
});
