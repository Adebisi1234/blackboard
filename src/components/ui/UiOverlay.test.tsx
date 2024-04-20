import { render, screen } from "@testing-library/react";
import Overlay from "./UiOverlay";

describe("Overlay", () => {
  test("renders the overlay component", () => {
    render(<Overlay />);

    // Assert that the components within the overlay are rendered correctly
    expect(screen.getByTestId("pages")).toBeInTheDocument();
    expect(screen.getByTestId("share")).toBeInTheDocument();
    expect(screen.getByTestId("zoom")).toBeInTheDocument();
    expect(screen.getByTestId("controls")).toBeInTheDocument();
    expect(screen.getByTestId("help")).toBeInTheDocument();
  });

  test("renders the panel component when window width is greater than or equal to 768", () => {
    // Mock the useWindowSize hook to return a window width of 800
    jest.spyOn(window, "innerWidth", "get").mockReturnValue(800);

    render(<Overlay />);

    // Assert that the panel component is rendered
    expect(screen.getByTestId("panel")).toBeInTheDocument();
  });

  test("does not render the panel component when window width is less than 768", () => {
    // Mock the useWindowSize hook to return a window width of 600
    jest.spyOn(window, "innerWidth", "get").mockReturnValue(600);

    render(<Overlay />);

    // Assert that the panel component is not rendered
    expect(screen.queryByTestId("panel")).toBeNull();
  });
});
