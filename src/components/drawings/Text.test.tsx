import { describe } from "vitest";
import Text from "./Text";
import {
  fireEvent,
  render,
  renderHook,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { useDrawing, useGeneral } from "../../store/Store";
import { Drawings } from "../../types/general";

describe(Text, () => {
  test("Text component renders", async () => {
    const { setDrawing, getDrawing, updateDrawing } = renderHook(() =>
      useDrawing()
    ).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;

    const newTextComp = {
      id: 0,
      ...general,
      prop: {
        type: "text",
        value: "",
      },
      pos: {
        x: 10,
        y: 10,
      },
    } satisfies Drawings<"text">[0];
    act(() => {
      setDrawing!(newTextComp);
    });
    const drawing = getDrawing();
    render(<Text {...newTextComp} />);
    const comp = screen.getByTestId(0);
    expect(comp).toBeInTheDocument();
    act(() => {
      updateDrawing(0, { ...newTextComp, opacity: 0 });
    });
    expect(screen.findByTestId(0)).toBeVisible();
  });
  test("Hide component with opacity prop", async () => {
    const { setDrawing, getDrawing, updateDrawing } = renderHook(() =>
      useDrawing()
    ).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;

    const newTextComp = {
      id: 0,
      ...general,
      opacity: 1,
      prop: {
        type: "text",
        value: "",
      },
      pos: {
        x: 10,
        y: 10,
      },
    } satisfies Drawings<"text">[0];

    render(<Text {...newTextComp} />);
    expect(await screen.findByTestId(0)).toBeVisible();
    render(<Text {...{ ...newTextComp, opacity: 0, id: 1 }} />);
    expect(await screen.findByTestId(1)).not.toBeVisible();
  });
});
