import { Drawings } from "../types/general";

type AdjustProp = {
  e: React.MouseEvent<SVGCircleElement | HTMLDivElement, MouseEvent>;
  drawing: Drawings;
  updateDrawing: (id: number, payload: Drawings[0]) => void;
  id: number;
  compType: "arrow" | "others";
  pos: string;
};

export default function adjustComp({
  e,
  drawing,
  updateDrawing,
  id,
  pos,
  compType,
}: AdjustProp) {
  if (compType === "arrow")
    return adjustArrow({
      e,
      drawing,
      updateDrawing,
      id,
      pos,
    });
  else if (compType === "others")
    return adjustRect({
      e,
      drawing,
      updateDrawing,
      id,
      pos,
    });
  else return;
}

function adjustArrow({
  e,
  drawing,
  updateDrawing,
  id,
  pos,
}: Omit<AdjustProp, "compType">) {
  if (pos === "top") {
  } else if (pos === "mid") {
    const edit = drawing[id] as Drawings<"arrow">[0];
    edit.prop.qCurve = {
      x: e.clientX,
      y: e.clientY,
    };
    updateDrawing(id, edit);
    return;
  } else if (pos === "end") {
  }
  // Check which circle is active
}

function adjustRect({
  e,
  drawing,
  updateDrawing,
  id,
  pos,
}: Omit<AdjustProp, "compType">) {
  if (e.type === "mousedown") {
  } else if (e.type === "mousemove") {
  } else if (e.type === "mouseup") {
  }
}
