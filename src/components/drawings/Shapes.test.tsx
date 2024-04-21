import { render, renderHook } from "@testing-library/react";
import { describe, test } from "vitest";
import Shapes from "./Shapes";
import { Drawings } from "../../types/general";
import { useDrawing, useGeneral } from "../../store/Store";

describe(Shapes, () => {
  test("Shape component rendered", () => {
    const { setDrawing, getDrawing, updateDrawing } = renderHook(() =>
      useDrawing()
    ).result.current;

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
        width: 0,
        height: 0,
      },
      pos: {
        x: 0,
        y: 0,
      },
    } satisfies Drawings<"shape">[0];
    render(<Shapes {...newShapeComp} />);
  });
});
