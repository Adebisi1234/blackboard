import { render, screen, fireEvent } from "@testing-library/react";
import Pages from "./Pages";

describe("Pages", () => {
  test("renders the component correctly", () => {
    render(<Pages />);

    // Assert that the buttons are rendered
    const menuButton = screen.getByRole("button", { name: "Menu" });
    const pageButton = screen.getByRole("button", { name: "Page 1" });

    expect(menuButton).toBeInTheDocument();
    expect(pageButton).toBeInTheDocument();
  });

  test("opens the menu dialog when menu button is clicked", () => {
    render(<Pages />);

    // Click the menu button
    const menuButton = screen.getByRole("button", { name: "Menu" });
    fireEvent.click(menuButton);

    // Assert that the menu dialog is open
    const menuDialog = screen.getByRole("dialog", { name: "Menu Dialog" });
    expect(menuDialog).toBeInTheDocument();
  });

  test("opens the page dialog when page button is clicked", () => {
    render(<Pages />);

    // Click the page button
    const pageButton = screen.getByRole("button", { name: "Page 1" });
    fireEvent.click(pageButton);

    // Assert that the page dialog is open
    const pageDialog = screen.getByRole("dialog", { name: "Page Dialog" });
    expect(pageDialog).toBeInTheDocument();
  });
});
