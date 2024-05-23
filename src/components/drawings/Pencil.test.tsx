import {
  render,
  screen,
  renderHook,
  act,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { describe, test } from "vitest";
import Pencil from "./Pencil";
import { Drawings } from "../../types/general";
import {
  useActiveTool,
  useDrawing,
  useGeneral,
  useLocation,
} from "../../store/Store";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe(Pencil, () => {
  test("Pencil component properly rendered", () => {
    const { setDrawing, getDrawing, updateDrawing } = renderHook(() =>
      useDrawing()
    ).result.current;
    const { setLocation } = renderHook(() => useLocation()).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;
    const newPencilComp = {
      id: 0,
      ...general,
      prop: {
        type: "pencil",
        path: [
          {
            func: "M",
            x: 10,
            y: 10,
          },
        ],
      },
      pos: {
        x: 0,
        y: 0,
      },
    } satisfies Drawings<"pencil">[0];
    act(() => {
      setDrawing(newPencilComp);
      setLocation({
        x: 10,
        y: 10,
        width: 0,
        height: 0,
        id: 0,
      });
    });
    render(<Pencil {...(getDrawing()[0] as Drawings<"pencil">[0])} />);
    expect(screen.getByTestId(0)).toBeInTheDocument();
  });
  test("Hovered component properly rendered", () => {
    const { setDrawing, getDrawing, updateDrawing } = renderHook(() =>
      useDrawing()
    ).result.current;
    const { setLocation } = renderHook(() => useLocation()).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;
    const newPencilComp = {
      id: 0,
      ...general,
      hovered: true,
      prop: {
        type: "pencil",
        path: [
          {
            func: "M",
            x: 10,
            y: 10,
          },
        ],
      },
      pos: {
        x: 0,
        y: 0,
      },
    } satisfies Drawings<"pencil">[0];
    act(() => {
      setDrawing(newPencilComp);
      setLocation({
        x: 10,
        y: 10,
        width: 0,
        height: 0,
        id: 0,
      });
    });
    render(<Pencil {...(getDrawing()[0] as Drawings<"pencil">[0])} />);
    expect(screen.getByTestId("hovered-0")).toBeInTheDocument();
  });
  test("Highlighted component properly rendered", () => {
    const { setDrawing, getDrawing, updateDrawing } = renderHook(() =>
      useDrawing()
    ).result.current;
    const { setLocation } = renderHook(() => useLocation()).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;
    const newPencilComp = {
      id: 0,
      ...general,
      highlight: true,
      prop: {
        type: "pencil",
        path: [
          {
            func: "M",
            x: 10,
            y: 10,
          },
          {
            func: "M",
            x: 10,
            y: 10,
          },
          {
            func: "M",
            x: 10,
            y: 10,
          },
          {
            func: "M",
            x: 10,
            y: 10,
          },
          {
            func: "M",
            x: 10,
            y: 10,
          },
          {
            func: "M",
            x: 10,
            y: 10,
          },
        ],
      },
      pos: {
        x: 0,
        y: 0,
      },
    } satisfies Drawings<"pencil">[0];
    act(() => {
      setDrawing(newPencilComp);
      setLocation({
        x: 10,
        y: 10,
        width: 0,
        height: 0,
        id: 0,
      });
    });
    render(<Pencil {...(getDrawing()[0] as Drawings<"pencil">[0])} />);
    expect(screen.getByTestId("overlay-0")).toBeInTheDocument();
  });
});
