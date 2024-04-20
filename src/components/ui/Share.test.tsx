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
    const shareDialog = screen.getByRole("dialog");
    expect(shareDialog).toBeInTheDocument();
  });

  test("closes the share dialog when the button is clicked again", () => {
    render(<Share />);
    const shareButton = screen.getByText("Share");
    fireEvent.click(shareButton);
    fireEvent.click(shareButton);
    const shareDialog = screen.queryByRole("dialog");
    expect(shareDialog).not.toBeInTheDocument();
  });
});
