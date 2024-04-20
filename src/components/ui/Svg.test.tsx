import { render, screen } from "@testing-library/react";
import { Cursor } from "./Svg";

describe("Cursor", () => {
  test("renders the cursor with correct props", () => {
    const canvasPos = { x: 0, y: 0 };
    const pos = { x: 100, y: 200 };

    render(<Cursor pos={pos} />);

    const cursorElement = screen.getByTestId("cursor");

    expect(cursorElement).toBeInTheDocument();
    expect(cursorElement).toHaveStyle({ left: "100px", top: "200px" });
  });

  test("renders the cursor with triangle left when x position is less than canvasPos.x", () => {
    const canvasPos = { x: 0, y: 0 };
    const pos = { x: -50, y: 200 };

    render(<Cursor pos={pos} />);

    const triangleLeftElement = screen.getByTestId("triangle-left");

    expect(triangleLeftElement).toBeInTheDocument();
    expect(triangleLeftElement).toHaveStyle({ left: "-50px", top: "200px" });
  });

  test("renders the cursor with triangle right when x position is greater than windowWidth - canvasPos.x", () => {
    const canvasPos = { x: 0, y: 0 };
    const windowWidth = 800;
    const pos = { x: 900, y: 200 };

    render(<Cursor pos={pos} />);

    const triangleRightElement = screen.getByTestId("triangle-right");

    expect(triangleRightElement).toBeInTheDocument();
    expect(triangleRightElement).toHaveStyle({ left: "900px", top: "200px" });
  });

  test("renders the cursor with triangle up when y position is less than canvasPos.y", () => {
    const canvasPos = { x: 0, y: 0 };
    const pos = { x: 100, y: -50 };

    render(<Cursor pos={pos} />);

    const triangleUpElement = screen.getByTestId("triangle-up");

    expect(triangleUpElement).toBeInTheDocument();
    expect(triangleUpElement).toHaveStyle({ left: "100px", top: "-50px" });
  });

  test("renders the cursor with triangle down when y position is greater than windowHeight - canvasPos.y", () => {
    const canvasPos = { x: 0, y: 0 };
    const windowHeight = 600;
    const pos = { x: 100, y: 700 };

    render(<Cursor pos={pos} />);

    const triangleDownElement = screen.getByTestId("triangle-down");

    expect(triangleDownElement).toBeInTheDocument();
    expect(triangleDownElement).toHaveStyle({ left: "100px", top: "700px" });
  });
});
