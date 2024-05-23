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
    const duplicateButton = screen.getByTitle("Duplicate");
    const resetButton = screen.getByTitle("Reset Everything");

    expect(undoButton).toBeInTheDocument();
    expect(redoButton).toBeInTheDocument();
    expect(trashButton).toBeInTheDocument();
    expect(duplicateButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  test("calls the undo function when the undo button is clicked", async () => {
    // Guess I don't understand mocking afterall
    const undoMock = vi.hoisted(() => vi.fn());
    const copyMock = vi.hoisted(() => vi.fn());
    const pasteMock = vi.hoisted(() => vi.fn());
    const hideMock = vi.hoisted(() => vi.fn());
    const restoreMock = vi.hoisted(() => vi.fn());
    const clearAllMock = vi.hoisted(() => vi.fn());
    vi.mock("../../../store/Store", async (initial) => {
      const drawing = [1, 2, 3];
      const og = await initial();
      const useDrawing = () => ({
        hideComp: hideMock,
        copyComp: copyMock,
        pasteComp: pasteMock,
        restoreComp: restoreMock,
        undo: undoMock,
        getDrawing: vi.fn(() => [0, 1, 2, 3, 4]),
        clearAll: clearAllMock,
      });
      useDrawing.persist = { clearStorage: vi.fn() };
      return {
        ...og!,

        useActive: () => [1, 2, 3],
        useDrawing,
      };
    });

    render(<UndoRedoTrash />);
    const undoButton = screen.getByTitle("Remove last component(s)");
    const redoButton = screen.getByTitle("Restore removed component(s)");
    const trashButton = screen.getByTitle("Remove selected component(s)");
    const duplicateButton = screen.getByTitle("Duplicate");
    const resetButton = screen.getByTitle("Reset Everything");

    await user.pointer({ keys: "[MouseLeft]", target: undoButton });
    expect(undoButton).toBeInTheDocument();
    // expect(undoButton).not.toHaveClass("opacity-50");
    expect(undoMock).toHaveBeenCalledTimes(1);
    await user.pointer({ keys: "[MouseLeft]", target: redoButton });
    expect(redoButton).toBeInTheDocument();
    // expect(redoButton).not.toHaveClass("opacity-50");
    expect(restoreMock).toHaveBeenCalledTimes(1);
    await user.pointer({ keys: "[MouseLeft]", target: trashButton });
    expect(trashButton).toBeInTheDocument();
    // expect(trashButton).not.toHaveClass("opacity-50");
    expect(hideMock).toHaveBeenCalledTimes(3);
    await user.pointer({ keys: "[MouseLeft]", target: resetButton });
    expect(resetButton).toBeInTheDocument();
    // expect(resetButton).not.toHaveClass("opacity-50");
    expect(clearAllMock).toHaveBeenCalledTimes(1);
    await user.pointer({ keys: "[MouseLeft]", target: duplicateButton });
    expect(duplicateButton).toBeInTheDocument();
    // expect(duplicateButton).not.toHaveClass("opacity-50");
    expect(copyMock).toHaveBeenCalledTimes(1);
    expect(pasteMock).toHaveBeenCalledTimes(1);
  });

  // Add more tests for other button functionalities...
});
