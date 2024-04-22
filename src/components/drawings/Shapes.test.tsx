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
    const container = render(
      <Shapes {...(getDrawing()[0] as Drawings<"shape">[0])} />
    ).container;
    const shapeComp = screen.getByTestId(0) as unknown as SVGRectElement;
    fireEvent(
      shapeComp,
      new MouseEvent("pointermove", { clientX: 10, clientY: 10 })
    );
    fireEvent(
      shapeComp,
      new MouseEvent("pointermove", {
        clientX: 2,
        clientY: 2,
        movementX: 1,
        movementY: 1,
      })
    );
    // user.pointer([
    //   // touch the screen at element1
    //   {
    //     keys: "[TouchA>]",
    //     target: container,
    //     coords: { clientX: 10, clientY: 10 },
    //   },
    //   // move the touch pointer to element2
    //   {
    //     pointerName: "TouchA",
    //     target: shapeComp,
    //     coords: { clientX: 40, clientY: 30 },
    //   },
    //   // release the touch pointer at the last position (element2)
    //   { keys: "[/TouchA]" },
    // ]);
    await waitFor(() => {
      // expect(screen.queryByTestId(0)?.getAttribute("x")).toBe("30");
      // console.log(screen.queryByTestId(0));
    });
    // expect(shapeComp.getAttribute("x")).toBe("30");
  });
});
