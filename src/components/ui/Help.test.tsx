import { render, screen, fireEvent } from "@testing-library/react";
import Help from "./Help";

describe("Help", () => {
  test("renders the help button and dialog", () => {
    render(<Help />);

    const helpButton = screen.getByTestId("help");
    expect(helpButton).toBeInTheDocument();

    fireEvent.click(helpButton);

    const helpDialog = screen.getByTestId<HTMLDialogElement>("help-dialog");
    expect(helpDialog.open).toBe(true);
  });

  test("closes the help dialog when clicked again", () => {
    render(<Help />);

    const helpButton = screen.getByTestId("help");
    fireEvent.click(helpButton);

    const helpDialog = screen.getByTestId<HTMLDialogElement>("help-dialog");
    expect(helpDialog.open).toBe(true);

    fireEvent.click(helpButton);

    expect(helpDialog.open).toBe(false);
  });
});
