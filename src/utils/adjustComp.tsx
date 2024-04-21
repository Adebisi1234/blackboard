import { produce } from "immer";
import { Drawings, Location } from "../types/general";

type AdjustProp = {
  e: React.MouseEvent<SVGCircleElement | HTMLDivElement, MouseEvent>;
  drawing: Drawings;
  updateDrawing: (id: number, payload: Drawings[0]) => void;
  id: number;
  compType: "arrow" | "pencil" | "image" | "shape" | "text" | "note";
  pos: string;
  location?: {
    [key: number]: Location;
  };
  canvasPos: { x: number; y: number };
};

export default function adjustComp({
  e,
  drawing,
  updateDrawing,
  id,
  pos,
  compType,
  location,
  canvasPos,
}: AdjustProp) {
  if (compType === "arrow")
    return adjustArrow({
      e,
      drawing,
      updateDrawing,
      id,
      pos,
      canvasPos,
    });
  else if (compType === "pencil") {
    adjustPencil({
      e,
      drawing,
      updateDrawing,
      id,
      pos,
      canvasPos,
    });
  } else if (compType)
    return adjustRect({
      e,
      drawing,
      updateDrawing,
      id,
      pos,
      compType,
      location,
      canvasPos,
    });
  else return;
}

export function adjustArrow({
  e,
  drawing,
  updateDrawing,
  id,
  pos,
  canvasPos,
}: Omit<AdjustProp, "compType" | "location">) {
  const edit = produce(drawing[id] as Drawings<"arrow">[0], (draft) => {
    if (pos === "start") {
      draft.prop.startPos = {
        x: e.clientX - canvasPos.x,
        y: e.clientY - canvasPos.y,
      };
    } else if (pos === "mid") {
      draft.prop.qCurve = {
        x: e.clientX - canvasPos.x,
        y: e.clientY - canvasPos.y,
      };
    } else if (pos === "end") {
      draft.prop.endPos = {
        x: e.clientX - canvasPos.x,
        y: e.clientY - canvasPos.y,
      };
    }
  });
  updateDrawing(id, edit);
}

export function adjustRect({
  e,
  drawing,
  updateDrawing,
  id,
  pos,
  compType,
  location,
  canvasPos,
}: AdjustProp) {
  switch (compType) {
    case "arrow":
      break;
    case "pencil":
      break;

    case "image":
      return adjustImage({
        e,
        drawing,
        updateDrawing,
        id,
        pos,
        location,
        canvasPos,
      });
    case "shape":
      return adjustShape({
        e,
        drawing,
        updateDrawing,
        id,
        pos,
        location,
        canvasPos,
      });
    case "text":
      return adjustText({
        e,
        drawing,
        updateDrawing,
        id,
        pos,
        location,
        canvasPos,
      });
    default:
      console.log("error at adjusting comp:", {
        e,
        drawing,
        updateDrawing,
        id,
        pos,
        compType,
      });
  }
}

export function adjustPencil({
  e,
  drawing,
  updateDrawing,
  id,
  pos,
  canvasPos,
}: Omit<AdjustProp, "compType" | "location">) {
  const edit = produce(drawing[id] as Drawings<"pencil">[0], (draft) => {
    if (pos === "start") {
      draft.prop.path.unshift(
        {
          func: "M",
          x: e.clientX - canvasPos.x,
          y: e.clientY - canvasPos.y,
        },
        {
          func: "L",
          x: draft.prop.path[0].x,
          y: draft.prop.path[0].y,
        }
      );
    } else if (pos === "end") {
      draft.prop.path.push(
        {
          func: "L",
          x: e.clientX - canvasPos.x,
          y: e.clientY - canvasPos.y,
        },
        {
          func: "M",
          x: e.clientX - canvasPos.x,
          y: e.clientY - canvasPos.y,
        }
      );
    }
  });

  updateDrawing(id, edit);
}
export function adjustImage({
  e,
  drawing,
  updateDrawing,
  id,
  pos,
}: Omit<AdjustProp, "compType">) {
  const edit = produce(drawing[id] as Drawings<"image">[0], (draft) => {
    if (pos === "tl") {
      const diff = {
        x: draft.prop.x - e.clientX,
        y: draft.prop.y - e.clientY,
      };
      draft.prop.x = e.clientX;
      draft.prop.y = e.clientY;
      draft.prop.width = Math.max(0, draft.prop.width + diff.x);
      draft.prop.height = Math.max(0, draft.prop.height + diff.y);
    } else if (pos === "tr") {
      const diff = {
        x: e.clientX - (draft.prop.x + draft.prop.width),
        y: draft.prop.y - e.clientY,
      };
      draft.prop.y = e.clientY;
      draft.prop.width = Math.max(0, draft.prop.width + diff.x);
      draft.prop.height = Math.max(0, draft.prop.height + diff.y);
    } else if (pos === "bl") {
      const diff = {
        x: draft.prop.x - e.clientX,
        y: e.clientY - (draft.prop.y + draft.prop.height),
      };
      draft.prop.x = e.clientX;
      draft.prop.width = Math.max(0, draft.prop.width + diff.x);
      draft.prop.height = Math.max(0, draft.prop.height + diff.y);
    } else if (pos === "br") {
      const diff = {
        x: e.clientX - (draft.prop.x + draft.prop.width),
        y: e.clientY - (draft.prop.y + draft.prop.height),
      };
      draft.prop.width = Math.max(0, draft.prop.width + diff.x);
      draft.prop.height = Math.max(0, draft.prop.height + diff.y);
    }
  });
  updateDrawing!(id, edit);
}
export function adjustShape({
  e,
  drawing,
  updateDrawing,
  id,
  pos,
}: Omit<AdjustProp, "compType">) {
  const edit = produce(drawing[id] as Drawings<"shape">[0], (draft) => {
    if (pos === "tl") {
      const diff = {
        x: draft.prop.pos.x - e.clientX,
        y: draft.prop.pos.y - e.clientY,
      };
      draft.prop.pos.x = e.clientX;
      draft.prop.pos.y = e.clientY;
      draft.prop.width = Math.max(0, draft.prop.width + diff.x);
      draft.prop.height = Math.max(0, draft.prop.height + diff.y);
    } else if (pos === "tr") {
      const diff = {
        x: e.clientX - (draft.prop.pos.x + draft.prop.width),
        y: draft.prop.pos.y - e.clientY,
      };
      draft.prop.pos.y = e.clientY;
      draft.prop.width = Math.max(0, draft.prop.width + diff.x);
      draft.prop.height = Math.max(0, draft.prop.height + diff.y);
    } else if (pos === "bl") {
      const diff = {
        x: draft.prop.pos.x - e.clientX,
        y: e.clientY - (draft.prop.pos.y + draft.prop.height),
      };
      draft.prop.pos.x = e.clientX;
      draft.prop.width = Math.max(0, draft.prop.width + diff.x);
      draft.prop.height = Math.max(0, draft.prop.height + diff.y);
    } else if (pos === "br") {
      const diff = {
        x: e.clientX - (draft.prop.pos.x + draft.prop.width),
        y: e.clientY - (draft.prop.pos.y + draft.prop.height),
      };
      draft.prop.width = Math.max(0, draft.prop.width + diff.x);
      draft.prop.height = Math.max(0, draft.prop.height + diff.y);
    }
  });
  // rect shape first
  updateDrawing!(id, edit);
}
export function adjustText({
  e,
  drawing,
  updateDrawing,
  id,
  pos,
  canvasPos,
}: Omit<AdjustProp, "compType">) {
  const edit = produce(drawing[id] as Drawings<"text">[0], (draft) => {
    draft.pos = { x: e.clientX - canvasPos.x, y: e.clientY - canvasPos.y };
  });
  updateDrawing!(id, edit);
}
