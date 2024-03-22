import { Drawings } from "../types/general";
import { getDiff } from "./math";

type AdjustProp = {
  e: React.MouseEvent<SVGCircleElement | HTMLDivElement, MouseEvent>;
  drawing: Drawings;
  updateDrawing: (id: number, payload: Drawings[0]) => void;
  id: number;
  compType: "arrow" | "pencil" | "image" | "shape" | "text";
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
  else if (compType)
    return adjustRect({
      e,
      drawing,
      updateDrawing,
      id,
      pos,
      compType,
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
  const edit = { ...drawing[id] } as Drawings<"arrow">[0];
  if (pos === "top") {
  } else if (pos === "mid") {
    edit.prop.qCurve = {
      x: e.clientX,
      y: e.clientY,
    };
  } else if (pos === "end") {
  }
  updateDrawing(id, edit);
}

function adjustRect({
  e,
  drawing,
  updateDrawing,
  id,
  pos,
  compType,
}: AdjustProp) {
  const edit = { ...drawing[id] } as Drawings<"shape">[0];
  // rect shape first
  if (pos === "tl") {
    const diff = {
      x: edit.prop.pos.x - e.clientX,
      y: edit.prop.pos.y - e.clientY,
    };
    edit.prop.pos.x = e.clientX;
    edit.prop.pos.y = e.clientY;
    edit.prop.width = Math.max(0, edit.prop.width + diff.x);
    edit.prop.height = Math.max(0, edit.prop.height + diff.y);
  } else if (pos === "tr") {
    const diff = {
      x: e.clientX - (edit.prop.pos.x + edit.prop.width),
      y: edit.prop.pos.y - e.clientY,
    };
    edit.prop.pos.y = e.clientY;
    edit.prop.width = Math.max(0, edit.prop.width + diff.x);
    edit.prop.height = Math.max(0, edit.prop.height + diff.y);
  } else if (pos === "bl") {
    const diff = {
      x: edit.prop.pos.x - e.clientX,
      y: e.clientY - (edit.prop.pos.y + edit.prop.height),
    };
    edit.prop.pos.x = e.clientX;
    edit.prop.width = Math.max(0, edit.prop.width + diff.x);
    edit.prop.height = Math.max(0, edit.prop.height + diff.y);
  } else if (pos === "br") {
    const diff = {
      x: e.clientX - (edit.prop.pos.x + edit.prop.width),
      y: e.clientY - (edit.prop.pos.y + edit.prop.height),
    };
    edit.prop.width = Math.max(0, edit.prop.width + diff.x);
    edit.prop.height = Math.max(0, edit.prop.height + diff.y);
  }
  /* 
  if (e.clientX < edit.prop.startPos.x) {
    edit.prop.pos.x =
      edit.prop.startPos.x - getDiff(edit.prop.startPos.x, e.clientX);
    edit.prop.width = getDiff(edit.prop.startPos.x, e.clientX);
  } else {
    edit.prop.width = e.clientX - edit.prop.pos.x;
  }
  if (e.clientY < edit.prop.startPos.y) {
    edit.prop.pos.y =
      edit.prop.startPos.y - getDiff(edit.prop.startPos.y, e.clientY);
    edit.prop.height = getDiff(edit.prop.startPos.y, e.clientY);
  } else {
    edit.prop.height = e.clientY - edit.prop.pos.y;
  }
   */
  updateDrawing!(id, edit);
}
