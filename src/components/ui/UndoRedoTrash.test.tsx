import { render, screen, fireEvent } from "@testing-library/react";
import UndoRedoTrash from "./UndoRedoTrash";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
const user = userEvent.setup();

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

  test("calls the undo function when the undo button is clicked", async () => {
    const undoMock = vi.fn(() => {
      console.log("Hallelujah");
    });
    vi.mock("./useDrawing", () => ({
      useDrawing: () => ({
        undo: undoMock,
        restoreComp: undoMock,
        getDrawing: () => [1],
      }),
    }));

    render(<UndoRedoTrash />);

    const undoButton = screen.getByTitle("Remove last component(s)");
    await user.pointer({ keys: "[MouseLeft]", target: undoButton });
    expect(undoButton).toBeInTheDocument();
    expect(undoMock).toHaveBeenCalledTimes(1);
  });

  // Add more tests for other button functionalities...
});
