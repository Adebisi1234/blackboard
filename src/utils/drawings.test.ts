import { describe, vi } from "vitest";
import {
  addDrawing,
  cleanUpDrawing,
  cloneComp,
  drawOnCanvas,
  generateImage,
  getRandomColor,
  modifyDrawing,
  removeComp,
} from "./drawings";
import { act, render, renderHook, screen } from "@testing-library/react";
import { useImage, useDrawing, useGeneral } from "../store/Store";
import { Drawings, ImageProp } from "../types/general";
describe(getRandomColor, () => {
  test("Expect the function to return different values each time", () => {
    let color1 = getRandomColor();
    let color2 = getRandomColor();
    expect(color1).not.toBe(color2);
  });
});

// describe(generateImage, () => {
//   test("setImage should be called", async () => {
//     const testingFile: File = {
//       lastModified: 2393993,
//       name: "demo.jpg",
//       webkitRelativePath: "./",
//       size: 2334,
//       type: "test",
//       arrayBuffer: vi.fn(),
//       slice: vi.fn(),
//       stream: vi.fn(),
//       text: vi.fn(),
//     };
//     // Don't understand why this works yet
//     // const setImage = vi.mock("../store/Store", async (Original) => {
//     //   const actual: typeof useImage = await Original();
//     //   return {
//     //     ...actual,
//     //     setImage: (payload: any) => {
//     //       console.log(payload);
//     //     },
//     //   };
//     // }); //Better implementation will look into the above better later
//     const setImage = vi.fn((payload) => console.log(payload));

//     generateImage(testingFile, setImage);
//     expect(setImage).toHaveBeenCalledTimes(1);
//   });
// });

describe(cloneComp, () => {
  test("image clone", () => {
    const comp: Partial<Drawings<"image">[0]> = {
      prop: {
        src: "./",
        type: "image",
        alt: "testing cloneComp",
        width: 10,
        height: 10,
        x: 10,
        y: 10,
      },
    };
    const clone = cloneComp<"image">(comp as Drawings<"image">[0]);
    expect(clone.prop.x).toBe(30);
    expect(clone.prop.y).toBe(30);
  });
  test("shape clone", () => {
    const comp: Partial<Drawings<"shape">[0]> = {
      prop: {
        type: "shape",
        pos: { x: 10, y: 10 },
        startPos: { x: 0, y: 0 },
        width: 0,
        height: 0,
      },
    };
    const clone = cloneComp<"shape">(comp as Drawings<"shape">[0]);
    expect(clone.prop.pos.x).toBe(30);
    expect(clone.prop.pos.y).toBe(30);
  });
  test("text & note clone", () => {
    const comp: Partial<Drawings<"text">[0]> = {
      prop: { type: "text" },
      pos: {
        x: 10,
        y: 10,
      },
    };
    const clone = cloneComp<"text">(comp as Drawings<"text">[0]);
    expect(clone.pos.x).toBe(30);
    expect(clone.pos.y).toBe(30);
  });
  test("pencil clone", () => {
    const comp: Partial<Drawings<"pencil">[0]> = {
      prop: {
        type: "pencil",
        path: [{ func: "M", x: 10, y: 10 }],
      },
    };
    const clone = cloneComp<"pencil">(comp as Drawings<"pencil">[0]);
    expect(clone.prop.path).toEqual(
      comp.prop!.path.map((value) => {
        return { ...value, x: 30, y: 30 };
      })
    );
  });
  test("arrow clone", () => {
    const comp: Partial<Drawings<"arrow">[0]> = {
      prop: {
        startPos: {
          x: 10,
          y: 10,
        },
        endPos: {
          x: 20,
          y: 20,
        },
        type: "arrow",
        qCurve: { x: 5, y: 5 },
      },
    };
    const clone = cloneComp<"arrow">(comp as Drawings<"arrow">[0]);
    expect(clone.prop.startPos.x).toBe(30);
    expect(clone.prop.startPos.y).toBe(30);
    expect(clone.prop.endPos.x).toBe(40);
    expect(clone.prop.endPos.y).toBe(40);
    expect(clone.prop.qCurve!.x).toBe(25);
    expect(clone.prop.qCurve!.y).toBe(25);
  });
});

describe(removeComp, () => {
  test("hideComp should be called based on id", () => {
    const hideComp = vi.fn();
    let id = 1;
    removeComp(1, hideComp);
    expect(hideComp).toHaveBeenCalledTimes(1);
    id = -1;
    expect(hideComp).toHaveBeenCalledTimes(1);
  });
});

describe(drawOnCanvas, () => {
  test("components are rendered", () => {
    const { setDrawing, getDrawing } = renderHook(() => useDrawing()).result
      .current;
    act(() => {
      setDrawing({
        id: 0,
        color: "#ffffff",
        opacity: 1,
        strokeWidth: 3,
        dash: 0,
        fill: 0,
        scale: 1,
        highlight: true,
        copy: false,
        font: 24,
        hovered: false,
        userId: "94116959-1123-447e-966d-e73a2fed3dd5",
        prop: {
          type: "pencil",
          path: [
            {
              func: "M",
              x: 125,
              y: 286,
            },
            {
              func: "L",
              x: 140,
              y: 292,
            },
          ],
        },
        pos: {
          x: 0,
          y: 0,
        },
      });
      setDrawing({
        id: 1,
        color: "#ffffff",
        opacity: 1,
        strokeWidth: 3,
        dash: 0,
        fill: 0,
        scale: 1,
        highlight: true,
        copy: false,
        font: 24,
        hovered: false,
        userId: "c1d76267-c6d0-43a4-8be6-515c1bfe3396",
        prop: {
          type: "pencil",
          path: [
            {
              func: "M",
              x: 126,
              y: 216,
            },
            {
              func: "L",
              x: 146,
              y: 209,
            },
          ],
        },
        pos: {
          x: 0,
          y: 0,
        },
      });
    });
    const container = render(getDrawing().map(drawOnCanvas)).container;
    expect(container.querySelectorAll("svg").length).toBe(2);
  });
  test("wrong input should be ignored", () => {
    const { setDrawing, getDrawing } = renderHook(() => useDrawing()).result
      .current;
    act(() => {
      setDrawing({} as any);
      setDrawing({} as any);
      setDrawing({} as any);
    });
    const container = render(getDrawing().map(drawOnCanvas)).container;
    expect(container.querySelectorAll("svg").length).toBe(0);
  });
});

describe(cleanUpDrawing, () => {
  test("clearing pointer", () => {
    const spy = vi.spyOn(
      renderHook(() => useDrawing()).result.current,
      "clearPointer"
    );
    const drawing = [{ prop: { type: "pointer" } }] as Drawings;
    cleanUpDrawing({
      clearPointer: spy.mockImplementation((id) => undefined) as any,
      drawing,
    });
    expect(spy).toHaveBeenCalled();
  });
});

describe(modifyDrawing, () => {
  test("function works", () => {
    const { setDrawing, getDrawing, updateDrawing } = renderHook(() =>
      useDrawing()
    ).result.current;
    const { general } = renderHook(() => useGeneral()).result.current;
    act(() => {
      setDrawing({
        id: 0,
        ...general,
        userId: "94116959-1123-447e-966d-e73a2fed3dd5",
        prop: {
          type: "pencil",
          path: [
            {
              func: "M",
              x: 125,
              y: 286,
            },
            {
              func: "L",
              x: 140,
              y: 292,
            },
          ],
        },
        pos: {
          x: 0,
          y: 0,
        },
      });
    });
    const e = {
      clientX: 20,
      clientY: 20,
    };
    const drawingId = { current: 0 };
    const activeTool = "pencil";
    const drawing = getDrawing();
    modifyDrawing({
      e,
      drawingId,
      activeTool,
      drawing,
      updateDrawing,
      general,
    });
    expect(getDrawing().length).toBe(drawing.length);
    expect(getDrawing()[0]).not.toEqual(drawing[0]);
  });
});

describe(addDrawing, () => {
  test("function works", () => {
    const { setDrawing, getDrawing } = renderHook(() => useDrawing()).result
      .current;
    const { general } = renderHook(() => useGeneral()).result.current;

    const e = {
      clientX: 10,
      clientY: 10,
    };
    const drawingId = { current: 0 };
    const activeTool = "pencil";
    const drawing = getDrawing();
    addDrawing({
      e,
      drawingId,
      activeTool,
      drawing,
      setDrawing,
      general,
    });
    expect(getDrawing().length).toBeGreaterThan(drawing.length);
  });
});
