import { render, screen, fireEvent } from "@testing-library/react";
import Share from "./Share";

describe("Share", () => {
  test("renders the share button", () => {
    render(<Share />);
    const shareButton = screen.getByText("Share");
    expect(shareButton).toBeInTheDocument();
  });

  test("opens the share dialog when the button is clicked", () => {
    render(<Share />);
    const shareButton = screen.getByText("Share");
    fireEvent.click(shareButton);
    const shareDialog = screen.getByTestId<HTMLDialogElement>("share-dialog");
    expect(shareDialog.open).toBe(true);
  });

  test("closes the share dialog when the button is clicked again", () => {
    render(<Share />);
    const shareButton = screen.getByText("Share");
    fireEvent.click(shareButton);
    fireEvent.click(shareButton);
    const shareDialog = screen.getByTestId<HTMLDialogElement>("share-dialog");
    expect(shareDialog.open).toBe(false);
  });
});
