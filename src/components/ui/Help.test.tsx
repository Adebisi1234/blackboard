import { render, screen, fireEvent } from "@testing-library/react";
import Help from "./Help";

describe("Help", () => {
  test("renders the help button and dialog", () => {
    render(<Help />);

    const helpButton = screen.getByRole("button", { name: "Help" });
    expect(helpButton).toBeInTheDocument();

    fireEvent.click(helpButton);

    const helpDialog = screen.getByRole("dialog");
    expect(helpDialog).toBeInTheDocument();
  });

  test("closes the help dialog when clicked again", () => {
    render(<Help />);

    const helpButton = screen.getByRole("button", { name: "Help" });
    fireEvent.click(helpButton);

    const helpDialog = screen.getByRole("dialog");
    expect(helpDialog).toBeInTheDocument();

    fireEvent.click(helpButton);

    expect(helpDialog).not.toBeInTheDocument();
  });
});
