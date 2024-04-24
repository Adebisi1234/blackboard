import { render, screen, fireEvent } from "@testing-library/react";
import Pages from "./Pages";

describe("Pages", () => {
  test("renders the component correctly", () => {
    render(<Pages />);

    // Assert that the buttons are rendered
    const menuButton = screen.getByTestId("menu-button");
    const pageButton = screen.getByTestId("page-button");

    expect(menuButton).toBeInTheDocument();
    expect(pageButton).toBeInTheDocument();
  });

  test("opens the menu dialog when menu button is clicked", () => {
    render(<Pages />);

    // Click the menu button
    const menuButton = screen.getByTestId("menu-button");
    fireEvent.click(menuButton);

    // Assert that the menu dialog is open
    const menuDialog = screen.getByTestId("menu-dialog");
    expect(menuDialog).toBeInTheDocument();
  });

  test("opens the page dialog when page button is clicked", () => {
    render(<Pages />);

    // Click the page button
    const pageButton = screen.getByTestId("page-button");
    fireEvent.click(pageButton);

    // Assert that the page dialog is open
    const pageDialog = screen.getByTestId("page-dialog");
    expect(pageDialog).toBeInTheDocument();
  });
});
