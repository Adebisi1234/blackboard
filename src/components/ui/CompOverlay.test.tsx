import { act, render, renderHook, screen } from "@testing-library/react";
import CompOverlay from "./CompOverlay";
import { useDrawing, useGeneral, useLocation } from "../../store/Store";
import { Drawings } from "../../types/general";

describe("CompOverlay", () => {
  test("renders the arrow component correctly", () => {
    const { setDrawing } = renderHook(() => useDrawing()).result.current;
    const { general } = renderHook(() => useGeneral()).result.current;
    const newArrowComp = {
      ...general,
      prop: {
        startPos: {
          x: 0,
          y: 0,
        },
        endPos: {
          x: 10,
          y: 10,
        },
        type: "arrow",
      },
      id: 0,
      pos: {
        x: 10,
        y: 10,
      },
    } satisfies Drawings<"arrow">[0];
    act(() => setDrawing(newArrowComp));

    const prop = {
      type: "arrow" as const,
      id: 0,
      opacity: 1,
    };

    render(<CompOverlay {...prop} />);

    const overlay = screen.getByTestId("overlay-0");
    const circles = [...overlay.getElementsByClassName("adjust")];
    // Start
    expect(overlay).toBeInTheDocument();
    expect(circles[0]).toHaveAttribute("data-comp", "arrow");
    expect(circles[0]).toHaveAttribute("data-comp-id", "0");
    expect(circles[0]).toHaveClass("adjust");
    expect(circles[0]).toHaveAttribute("data-pos", "start");

    // Mid
    expect(circles[1]).toHaveAttribute("data-comp", "arrow");
    expect(circles[1]).toHaveAttribute("data-comp-id", "0");
    expect(circles[1]).toHaveClass("adjust");
    expect(circles[1]).toHaveAttribute("data-pos", "mid");
    // End
    expect(circles[2]).toHaveAttribute("data-comp", "arrow");
    expect(circles[2]).toHaveAttribute("data-comp-id", "0");
    expect(circles[2]).toHaveClass("adjust");
    expect(circles[2]).toHaveAttribute("data-pos", "end");
  });

  test("renders the pencil component correctly", () => {
    const { setDrawing } = renderHook(() => useDrawing()).result.current;
    const { general } = renderHook(() => useGeneral()).result.current;

    const newPencilComp = {
      id: 0,
      ...general,
      prop: {
        type: "pencil",
        path: [
          {
            x: 0,
            y: 0,
          },
          {
            x: 0,
            y: 0,
          },
          {
            x: 0,
            y: 0,
          },
          {
            x: 0,
            y: 0,
          },
          {
            x: 0,
            y: 0,
          },
          {
            x: 0,
            y: 0,
          },
        ],
      },
      pos: {
        x: 0,
        y: 0,
      },
    } satisfies Drawings<"pencil">[0];

    act(() => setDrawing(newPencilComp));

    const prop = {
      type: "pencil" as const,
      id: 0,
      opacity: 1,
    };

    render(<CompOverlay {...prop} />);

    const overlay = screen.getByTestId("overlay-0");
    const circles = [...overlay.getElementsByClassName("adjust")];
    expect(overlay).toBeInTheDocument();
    // Start
    expect(circles[0]).toHaveAttribute("data-comp", "pencil");
    expect(circles[0]).toHaveAttribute("data-comp-id", "0");
    expect(circles[0]).toHaveAttribute("data-pos", "start");
    expect(circles[0]).toHaveClass("adjust");
    // End
    expect(circles[1]).toHaveAttribute("data-comp", "pencil");
    expect(circles[1]).toHaveAttribute("data-comp-id", "0");
    expect(circles[1]).toHaveAttribute("data-pos", "end");
    expect(circles[1]).toHaveClass("adjust");
  });

  test("renders the square component correctly", () => {
    const { setDrawing } = renderHook(() => useDrawing()).result.current;
    const { general } = renderHook(() => useGeneral()).result.current;
    const { setLocation } = renderHook(() => useLocation()).result.current;
    const newShapeComp = {
      id: 0,
      ...general,
      prop: {
        type: "shape",
        startPos: {
          x: 0,
          y: 0,
        },
        pos: {
          x: 10,
          y: 10,
        },
        width: 10,
        height: 10,
      },
      pos: {
        x: 10,
        y: 10,
      },
    } satisfies Drawings<"shape">[0];
    act(() => {
      setDrawing!(newShapeComp);
      setLocation({
        id: 0,
        x: 10,
        y: 10,
        width: 10,
        height: 19,
      });
    });
    const prop = {
      type: "shape" as const,
      id: 0,
      opacity: 1,
    };

    render(<CompOverlay {...prop} />);

    const overlay = screen.getByTestId("overlay-0");
    const circles = [...overlay.getElementsByClassName("adjust")];
    expect(overlay).toBeInTheDocument();
    // Top left
    expect(circles[0]).toHaveAttribute("data-comp", "shape");
    expect(circles[0]).toHaveAttribute("data-comp-id", "0");
    expect(circles[0]).toHaveAttribute("data-pos", "tl");
    expect(circles[0]).toHaveClass("adjust");
    // Top right
    expect(circles[1]).toHaveAttribute("data-comp", "shape");
    expect(circles[1]).toHaveAttribute("data-comp-id", "0");
    expect(circles[1]).toHaveAttribute("data-pos", "tr");
    expect(circles[1]).toHaveClass("adjust");
    // Bottom left
    expect(circles[2]).toHaveAttribute("data-comp", "shape");
    expect(circles[2]).toHaveAttribute("data-comp-id", "0");
    expect(circles[2]).toHaveAttribute("data-pos", "bl");
    expect(circles[2]).toHaveClass("adjust");
    // Bottom right
    expect(circles[3]).toHaveAttribute("data-comp", "shape");
    expect(circles[3]).toHaveAttribute("data-comp-id", "0");
    expect(circles[3]).toHaveAttribute("data-pos", "br");
    expect(circles[3]).toHaveClass("adjust");
  });
});
