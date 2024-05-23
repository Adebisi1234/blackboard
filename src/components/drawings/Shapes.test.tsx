import {
  render,
  screen,
  renderHook,
  act,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { describe, test } from "vitest";
import Shapes from "./Shapes";
import { Drawings } from "../../types/general";
import {
  useActiveTool,
  useDrawing,
  useGeneral,
  useLocation,
} from "../../store/Store";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe(Shapes, () => {
  test("Shape component properly rendered", () => {
    const { setDrawing, getDrawing, updateDrawing } = renderHook(() =>
      useDrawing()
    ).result.current;
    const { setLocation } = renderHook(() => useLocation()).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;
    const newShapeComp = {
      id: 0,
      ...general,
      prop: {
        type: "shape",
        startPos: {
          x: 10,
          y: 10,
        },
        pos: {
          x: 10,
          y: 10,
        },
        width: 10,
        height: 10,
      },
      pos: {
        x: 0,
        y: 0,
      },
    } satisfies Drawings<"shape">[0];
    act(() => {
      setDrawing(newShapeComp);
      setLocation({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        id: 0,
      });
    });
    render(<Shapes {...(getDrawing()[0] as Drawings<"shape">[0])} />);
    expect(screen.getByTestId(0)).toBeInTheDocument();
  });
  test("Hovered component is rendered", () => {
    const { setDrawing, getDrawing, updateDrawing } = renderHook(() =>
      useDrawing()
    ).result.current;
    const { setLocation } = renderHook(() => useLocation()).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;
    const newShapeComp = {
      id: 0,
      ...general,
      hovered: true,
      prop: {
        type: "shape",
        startPos: {
          x: 10,
          y: 10,
        },
        pos: {
          x: 10,
          y: 10,
        },
        width: 10,
        height: 10,
      },
      pos: {
        x: 0,
        y: 0,
      },
    } satisfies Drawings<"shape">[0];
    act(() => {
      setDrawing(newShapeComp);
      setLocation({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        id: 0,
      });
    });
    render(<Shapes {...(getDrawing()[0] as Drawings<"shape">[0])} />);
    expect(screen.getByTestId("hovered-0")).toBeInTheDocument();
  });
  test("Highlighted component is rendered", () => {
    const { setDrawing, getDrawing } = renderHook(() => useDrawing()).result
      .current;
    const { setLocation } = renderHook(() => useLocation()).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;
    const newShapeComp = {
      id: 0,
      ...general,
      highlight: true,
      prop: {
        type: "shape",
        startPos: {
          x: 10,
          y: 10,
        },
        pos: {
          x: 10,
          y: 10,
        },
        width: 10,
        height: 10,
      },
      pos: {
        x: 0,
        y: 0,
      },
    } satisfies Drawings<"shape">[0];
    act(() => {
      setDrawing(newShapeComp);
      setLocation({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        id: 0,
      });
    });
    render(<Shapes {...(getDrawing()[0] as Drawings<"shape">[0])} />);
    expect(screen.getByTestId("overlay-0")).toBeInTheDocument();
  });
  test("Component is movable", async () => {
    const { setDrawing, getDrawing } = renderHook(() => useDrawing()).result
      .current;
    const { setLocation } = renderHook(() => useLocation()).result.current;
    const { setActiveTool } = renderHook(() => useActiveTool()).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;
    const newShapeComp = {
      id: 0,
      ...general,
      highlight: true,
      prop: {
        type: "shape",
        startPos: {
          x: 10,
          y: 10,
        },
        pos: {
          x: 10,
          y: 10,
        },
        width: 10,
        height: 10,
      },
      pos: {
        x: 0,
        y: 0,
      },
    } satisfies Drawings<"shape">[0];
    act(() => {
      setActiveTool("hand");
      setDrawing(newShapeComp);
      setLocation({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        id: 0,
      });
    });
    const old = getDrawing()[0];
    const { rerender } = render(
      <Shapes {...(getDrawing()[0] as Drawings<"shape">[0])} />
    );
    const shapeComp = screen.getByTestId(0) as unknown as SVGRectElement;
    const event = new MouseEvent("pointermove", {
      clientX: 200,
      clientY: 200,
      bubbles: true,
      movementX: 100,
      movementY: 50,
    });

    fireEvent.pointerMove(shapeComp, event);
    rerender(<Shapes {...(getDrawing()[0] as Drawings<"shape">[0])} />);
    expect(old).toEqual(getDrawing()[0]);
  });
});
