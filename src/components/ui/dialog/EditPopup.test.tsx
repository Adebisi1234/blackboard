import { render, screen, act, renderHook } from "@testing-library/react";
import EditPopup from "./EditPopup";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useDrawing } from "../../../store/Store";
const user = userEvent.setup();

describe("EditPopup", () => {
  test("renders the EditPopup component with correct buttons", () => {
    render(<EditPopup />);

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

  test("calls the edit function when the appropriate button is clicked", async () => {
    // Finally understood mocking
    const undoMock = vi.hoisted(() => vi.fn());
    const copyMock = vi.hoisted(() => vi.fn());
    const pasteMock = vi.hoisted(() => vi.fn());
    const hideMock = vi.hoisted(() => vi.fn());
    const restoreMock = vi.hoisted(() => vi.fn());
    const clearAllMock = vi.hoisted(() => vi.fn());
    vi.mock("../../../store/Store", async (initial) => {
      const og = await initial();
      const useDrawing = () => ({
        hideComp: hideMock,
        copyComp: copyMock,
        pasteComp: pasteMock,
        restoreComp: restoreMock,
        undo: undoMock,
        drawing: [1, 2],
        clearAll: clearAllMock,
      });
      useDrawing.persist = { clearStorage: vi.fn() };
      return {
        ...og!,

        useActive: () => [1, 2, 3],
        useDrawing,
      };
    });

    render(<EditPopup />);

    const undoButton = screen.getByTitle("Remove last component(s)");
    const redoButton = screen.getByTitle("Restore removed component(s)");
    const trashButton = screen.getByTitle("Remove selected component(s)");
    const copyButton = screen.getByTitle("copy selected component(s)");
    const pasteButton = screen.getByTitle("paste copied component(s)");
    const duplicateButton = screen.getByTitle("Duplicate");
    const resetButton = screen.getByTitle("Reset Everything");

    await user.pointer({ keys: "[MouseLeft]", target: undoButton });
    expect(undoButton).toBeInTheDocument();
    expect(undoButton).not.toHaveClass("opacity-50");
    expect(undoMock).toHaveBeenCalledTimes(1);
    await user.pointer({ keys: "[MouseLeft]", target: redoButton });
    expect(redoButton).toBeInTheDocument();
    expect(redoButton).not.toHaveClass("opacity-50");
    expect(restoreMock).toHaveBeenCalledTimes(1);
    await user.pointer({ keys: "[MouseLeft]", target: trashButton });
    expect(trashButton).toBeInTheDocument();
    expect(trashButton).not.toHaveClass("opacity-50");
    expect(hideMock).toHaveBeenCalledTimes(3);
    await user.pointer({ keys: "[MouseLeft]", target: copyButton });
    expect(copyButton).toBeInTheDocument();
    expect(copyButton).not.toHaveClass("opacity-50");
    expect(copyMock).toHaveBeenCalledTimes(1);
    await user.pointer({ keys: "[MouseLeft]", target: pasteButton });
    expect(pasteButton).toBeInTheDocument();
    expect(pasteButton).not.toHaveClass("opacity-50");
    expect(pasteMock).toHaveBeenCalledTimes(1);
    await user.pointer({ keys: "[MouseLeft]", target: resetButton });
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).not.toHaveClass("opacity-50");
    expect(clearAllMock).toHaveBeenCalledTimes(1);
    await user.pointer({ keys: "[MouseLeft]", target: duplicateButton });
    expect(duplicateButton).toBeInTheDocument();
    expect(duplicateButton).not.toHaveClass("opacity-50");
    expect(copyMock).toHaveBeenCalledTimes(2);
    expect(pasteMock).toHaveBeenCalledTimes(2);
  });

  //   Add more tests for other button functionalities...
});
