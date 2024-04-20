import { render, screen, fireEvent } from "@testing-library/react";
import Zoom from "./Zoom";

describe("Zoom", () => {
  test("renders the zoom component correctly", () => {
    render(<Zoom />);

    // Check if the zoom component is rendered
    const zoomElement = screen.getByTestId("zoom-component");
    expect(zoomElement).toBeInTheDocument();

    // Check if the buttons are rendered
    const minusButton = screen.getByTestId("minus-button");
    expect(minusButton).toBeInTheDocument();

    const hundredPercentButton = screen.getByTestId("hundred-percent-button");
    expect(hundredPercentButton).toBeInTheDocument();

    const plusButton = screen.getByTestId("plus-button");
    expect(plusButton).toBeInTheDocument();

    const chevronButton = screen.getByTestId("chevron-button");
    expect(chevronButton).toBeInTheDocument();
  });

  test("toggles the dialog and mini map when chevron button is clicked", () => {
    render(<Zoom />);

    // Check if the dialog and mini map are initially hidden
    const dialogElement = screen.queryByTestId("zoom-dialog");
    expect(dialogElement).not.toBeInTheDocument();

    const miniMapElement = screen.queryByTestId("minimap");
    expect(miniMapElement).not.toBeInTheDocument();

    // Click the chevron button
    const chevronButton = screen.getByTestId("chevron-button");
    fireEvent.click(chevronButton);

    // Check if the dialog and mini map are displayed
    const updatedDialogElement = screen.getByTestId("zoom-dialog");
    expect(updatedDialogElement).toBeInTheDocument();

    const updatedMiniMapElement = screen.getByTestId("minimap");
    expect(updatedMiniMapElement).toBeInTheDocument();

    // Click the chevron button again
    fireEvent.click(chevronButton);

    // Check if the dialog and mini map are hidden again
    const hiddenDialogElement = screen.queryByTestId("zoom-dialog");
    expect(hiddenDialogElement).not.toBeInTheDocument();

    const hiddenMiniMapElement = screen.queryByTestId("minimap");
    expect(hiddenMiniMapElement).not.toBeInTheDocument();
  });
});
