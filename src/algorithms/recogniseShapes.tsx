import { Drawings, Location } from "../types/general.js";
import { lerp } from "../utils/math.js";
import { DollarRecognizer, Point } from "./DollarRecogniser.js";

const dR = new DollarRecognizer();
const threshold = 0.9; // This seems to be the best threshold for accuracy

export const recognizeShape = (points: { x: number; y: number }[]) => {
  const res = dR.Recognize(points.map(({ x, y }) => new Point(x, y)));
  console.log(res);
  if (res.Score > threshold) {
    return res;
  }
};

export const redrawShape = (
  type: "circle" | "rectangle" | "triangle",
  old: Drawings<"pencil">[0],
  loc: Location,
  formatShape: (
    newShape: { id: number; drawing: Drawings<"shape">[0] },
    oldShape: { id: number; drawing: typeof old }
  ) => void
) => {
  if (type === "circle") {
    const cx = lerp(loc.x, loc.x + loc.width, 0.5);
    const cy = lerp(loc.y, loc.y + loc.height, 0.5);
    const r = loc.height / 2;
    const { prop, ...general } = old;
    const newShape = {
      ...general,
      prop: {
        type: "shape",
        shape: "oval",
        startPos: {
          x: cx,
          y: cy,
        },
        pos: {
          x: cx,
          y: cy,
        },
        radius: r,
        width: loc.width,
        height: loc.height,
      },
    } satisfies Drawings<"shape">[0];

    formatShape(
      { id: old.id, drawing: newShape },
      { id: old.id, drawing: old }
    );
  } else if (type === "rectangle") {
    const { prop, ...general } = old;
    const newShape = {
      ...general,
      prop: {
        type: "shape",
        shape: "rect",
        startPos: {
          x: loc.x,
          y: loc.y,
        },
        pos: {
          x: loc.x,
          y: loc.y,
        },
        width: loc.width,
        height: loc.height,
      },
      pos: {
        x: loc.x,
        y: loc.y,
      },
    } satisfies Drawings<"shape">[0];
    formatShape(
      { id: old.id, drawing: newShape },
      { id: old.id, drawing: old }
    );
  } else if (type === "triangle") {
    const { x, y, width, height } = loc;
    const cx = lerp(x, x + width, 0.5);
    const { prop, ...general } = old;
    const newShape = {
      ...general,
      prop: {
        type: "shape",
        shape: "tri",
        startPos: {
          x: cx,
          y: y,
        },
        pos: {
          x: x,
          y: y,
        },
        width: width,
        height: height,
      },
      pos: {
        x: x,
        y: y,
      },
    } satisfies Drawings<"shape">[0];
    formatShape(
      { id: old.id, drawing: newShape },
      { id: old.id, drawing: old }
    );
  }
};
