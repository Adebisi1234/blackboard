import { act, render, renderHook, screen } from "@testing-library/react";
import { Cursor } from "./Svg";
import { vi } from "vitest";
import { useCanvas } from "../../store/Store";

describe(Cursor, () => {
  test("renders the cursor with correct props", () => {
    const pos = { x: 100, y: 200 };

    render(<Cursor pos={pos} />);

    const cursorElement = screen.getByTestId("cursor");

    expect(cursorElement).toBeInTheDocument();
    expect(cursorElement).toHaveStyle({ left: "100px", top: "200px" });
  });

  test("renders the cursor with triangle left when x position is less than canvasPos.x", () => {
    const pos = { x: -50, y: 200 };

    render(<Cursor pos={pos} />);

    const triangleLeftElement = screen.getByTestId("triangle-left");

    expect(triangleLeftElement).toBeInTheDocument();
    expect(triangleLeftElement).toHaveStyle({ left: "0px", top: "200px" });
  });

  test("renders the cursor with triangle right when x position is greater than windowWidth - canvasPos.x", () => {
    innerWidth = 800;
    const pos = { x: 900, y: 200 };

    render(<Cursor pos={pos} />);

    const triangleRightElement = screen.getByTestId("triangle-right");

    expect(triangleRightElement).toBeInTheDocument();
    expect(triangleRightElement).toHaveStyle({ left: "782px", top: "200px" });
  });

  test("renders the cursor with triangle up when y position is less than canvasPos.y", () => {
    const pos = { x: 100, y: -50 };

    render(<Cursor pos={pos} />);

    const triangleUpElement = screen.getByTestId("triangle-up");

    expect(triangleUpElement).toBeInTheDocument();
    expect(triangleUpElement).toHaveStyle({ left: "100px", top: "0px" });
  });

  test("renders the cursor with triangle down when y position is greater than windowHeight - canvasPos.y", () => {
    innerHeight = 600;
    const pos = { x: 100, y: 700 };

    render(<Cursor pos={pos} />);

    const triangleDownElement = screen.getByTestId("triangle-down");

    expect(triangleDownElement).toBeInTheDocument();
    expect(triangleDownElement).toHaveStyle({ left: "100px", top: "582px" });
  });
});
