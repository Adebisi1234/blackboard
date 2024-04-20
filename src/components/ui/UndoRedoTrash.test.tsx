import { render, screen, fireEvent } from "@testing-library/react";
import UndoRedoTrash from "./UndoRedoTrash";

describe("UndoRedoTrash", () => {
  test("renders the UndoRedoTrash component with correct buttons", () => {
    render(<UndoRedoTrash />);

    const undoButton = screen.getByTitle("Remove last component(s)");
    const redoButton = screen.getByTitle("Restore removed component(s)");
    const trashButton = screen.getByTitle("Remove selected component(s)");
    const copyButton = screen.getByTitle("copy selected component(s)");
    const resetButton = screen.getByTitle("Reset Everything");

    expect(undoButton).toBeInTheDocument();
    expect(redoButton).toBeInTheDocument();
    expect(trashButton).toBeInTheDocument();
    expect(copyButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  test("calls the undo function when the undo button is clicked", () => {
    const undoMock = jest.fn();
    jest.mock("./useDrawing", () => ({
      useDrawing: () => ({
        undo: undoMock,
        getDrawing: () => [],
      }),
    }));

    render(<UndoRedoTrash />);

    const undoButton = screen.getByTitle("Remove last component(s)");
    fireEvent.pointerDown(undoButton);

    expect(undoMock).toHaveBeenCalled();
  });

  // Add more tests for other button functionalities...
});
