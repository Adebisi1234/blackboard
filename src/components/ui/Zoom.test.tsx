import {
  render,
  screen,
  fireEvent,
  renderHook,
  act,
} from "@testing-library/react";
import Zoom from "./Zoom";
import { useOpenDialog } from "../../store/Store";
import { vi } from "vitest";
import useWindowSize from "../../hooks/useWindowSize";

describe("Zoom", () => {
  test("renders the zoom component correctly", () => {
    const { setDialog } = renderHook(() => useOpenDialog()).result.current;
    render(<Zoom />);
    act(() => {
      setDialog("zoom");
    });
    const zoomElement = screen.getByTestId("zoom");
    expect(zoomElement).toBeInTheDocument();

    const minusButton = screen.getByTestId("minus-button");
    expect(minusButton).toBeInTheDocument();

    const hundredPercentButton = screen.getByTestId("hundred-percent-button");
    expect(hundredPercentButton).toBeInTheDocument();

    const plusButton = screen.getByTestId("plus-button");
    expect(plusButton).toBeInTheDocument();

    const chevronButton = screen.getByTestId("chevron-button");
    expect(chevronButton).toBeInTheDocument();
  });

  test("toggles mini map when chevron button is clicked", () => {
    render(<Zoom />);

    // Check if the mini map are initially hidden

    const miniMapElement = screen.queryByTestId("minimap");
    expect(miniMapElement).toHaveClass("invisible");

    // Click the chevron button
    const chevronButton = screen.getByTestId("chevron-button");
    fireEvent.click(chevronButton);

    // Check if the mini map are displayed
    const updatedMiniMapElement = screen.getByTestId("minimap");
    expect(updatedMiniMapElement).not.toHaveClass("invisible");

    // Click the chevron button again
    fireEvent.click(chevronButton);

    // Check if the mini map are hidden again

    const hiddenMiniMapElement = screen.queryByTestId("minimap");
    expect(hiddenMiniMapElement).toHaveClass("invisible");
  });
  test("toggle the dialog when chevron button is clicked", () => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(800);
    window.innerWidth = 800;
    render(<Zoom />);

    // Check if the dialog and mini map are initially hidden
    const dialogElement =
      screen.queryByTestId<HTMLDialogElement>("zoom-dialog");
    expect(dialogElement?.open).toBe(false);

    // Click the chevron button
    const chevronButton = screen.getByTestId("chevron-button");
    fireEvent.click(chevronButton);

    // Check if the dialog and mini map are displayed

    const updatedDialogElement = screen.getByTestId("zoom-dialog");
    expect(updatedDialogElement).toBeInTheDocument();

    // Click the chevron button again
    fireEvent.click(chevronButton);

    // Check if the dialog and mini map are hidden again
    const hiddenDialogElement =
      screen.queryByTestId<HTMLDialogElement>("zoom-dialog");
    expect(hiddenDialogElement?.open).toBe(false);
  });
});
