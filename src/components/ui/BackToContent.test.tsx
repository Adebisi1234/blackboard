import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BackToContent from "./BackToContent";
import { vi } from "vitest";
import React from "react";

describe("BackToContent", () => {
  test("renders the button", () => {
    const setCanvasPosMock = vi.fn();
    const canvasRefMock = { style: { transform: "" } };
    vi.spyOn(React, "useContext").mockReturnValueOnce({
      canvasRef: canvasRefMock,
      canvasPos: { x: 400, y: 400 },
      setCanvasPos: setCanvasPosMock,
    });
    render(<BackToContent />);
    const buttonElement = screen.queryByText("Back to Content");
    expect(buttonElement).toBeInTheDocument();
  });

  test("resets canvas position when button is clicked", () => {
    const setCanvasPosMock = vi.fn();
    const canvasRefMock = { style: { transform: "" } };
    vi.spyOn(React, "useContext").mockReturnValueOnce({
      canvasRef: canvasRefMock,
      canvasPos: { x: 100, y: 100 },
      setCanvasPos: setCanvasPosMock,
    });

    render(<BackToContent />);
    const buttonElement = screen.getByText("Back to Content");
    fireEvent.pointerDown(buttonElement);

    expect(canvasRefMock.style.transform).toBe("translate(0,0)");
    expect(setCanvasPosMock).toHaveBeenCalledWith({ x: 0, y: 0 });
  });

  test("does not reset canvas position when canvasRef is not available", () => {
    const setCanvasPosMock = vi.fn();
    vi.spyOn(React, "useContext").mockReturnValueOnce({
      canvasRef: null,
      canvasPos: { x: 100, y: 100 },
      setCanvasPos: setCanvasPosMock,
    });

    render(<BackToContent />);
    const buttonElement = screen.getByText("Back to Content");
    fireEvent.pointerDown(buttonElement);

    expect(setCanvasPosMock).not.toHaveBeenCalled();
  });

  test("does not render the button when canvas position is within range", () => {
    const setCanvasPosMock = vi.fn();
    vi.spyOn(React, "useContext").mockReturnValueOnce({
      canvasRef: null,
      canvasPos: { x: 200, y: 200 },
      setCanvasPos: setCanvasPosMock,
    });

    render(<BackToContent />);
    const buttonElement = screen.queryByText("Back to Content");

    expect(buttonElement).toBeNull();
  });
});
