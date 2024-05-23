import { render, screen, fireEvent } from "@testing-library/react";
import Controls from "./Controls";

describe("Controls", () => {
  test("renders all buttons with correct props", () => {
    render(<Controls />);

    const pointerButton = screen.getByTitle("Tool - pointer");
    const handButton = screen.getByTitle("Tool - Grab");
    const pencilButton = screen.getByTitle("Tool - pencil");
    const eraserButton = screen.getByTitle("Tool - eraser");
    const arrowButton = screen.getByTitle("Tool - arrow");
    const textButton = screen.getByTitle("Tool - text");
    const noteButton = screen.getByTitle("Tool - note");
    const imageButton = screen.getByTitle("Tool - image");
    const shapeButton = screen.getByTitle("Tool - shape");

    expect(pointerButton).toBeInTheDocument();
    expect(handButton).toBeInTheDocument();
    expect(pencilButton).toBeInTheDocument();
    expect(eraserButton).toBeInTheDocument();
    expect(arrowButton).toBeInTheDocument();
    expect(textButton).toBeInTheDocument();
    expect(noteButton).toBeInTheDocument();
    expect(imageButton).toBeInTheDocument();
    expect(shapeButton).toBeInTheDocument();

    // Add more assertions for other buttons if needed
  });

  test("sets active tool when a button is clicked", () => {
    render(<Controls />);

    const pointerButton = screen.getByTitle("Tool - pointer");
    const handButton = screen.getByTitle("Tool - Grab");
    const pencilButton = screen.getByTitle("Tool - pencil");
    const eraserButton = screen.getByTitle("Tool - eraser");
    const arrowButton = screen.getByTitle("Tool - arrow");
    const textButton = screen.getByTitle("Tool - text");
    const noteButton = screen.getByTitle("Tool - note");
    const imageButton = screen.getByTitle("Tool - image");
    const shapeButton = screen.getByTitle("Tool - shape");

    fireEvent.click(pointerButton);
    expect(pointerButton).toHaveClass("bg-[#4387f4]");
    expect(handButton).not.toHaveClass("bg-[#4387f4]");
    expect(pencilButton).not.toHaveClass("bg-[#4387f4]");
    expect(eraserButton).not.toHaveClass("bg-[#4387f4]");
    expect(arrowButton).not.toHaveClass("bg-[#4387f4]");
    expect(textButton).not.toHaveClass("bg-[#4387f4]");
    expect(noteButton).not.toHaveClass("bg-[#4387f4]");
    expect(imageButton).not.toHaveClass("bg-[#4387f4]");
    expect(shapeButton).not.toHaveClass("bg-[#4387f4]");

    fireEvent.click(handButton);
    expect(pointerButton).not.toHaveClass("bg-[#4387f4]");
    expect(handButton).toHaveClass("bg-[#4387f4]");
    expect(pencilButton).not.toHaveClass("bg-[#4387f4]");
    expect(eraserButton).not.toHaveClass("bg-[#4387f4]");
    expect(arrowButton).not.toHaveClass("bg-[#4387f4]");
    expect(textButton).not.toHaveClass("bg-[#4387f4]");
    expect(noteButton).not.toHaveClass("bg-[#4387f4]");
    expect(imageButton).not.toHaveClass("bg-[#4387f4]");
    expect(shapeButton).not.toHaveClass("bg-[#4387f4]");

    // Add more assertions for other buttons if needed
  });

  // Add more tests for other functionality if needed
});
