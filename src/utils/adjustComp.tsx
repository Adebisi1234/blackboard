import { Drawings, Location } from "../types/general";

type AdjustProp = {
  e: React.MouseEvent<SVGCircleElement | HTMLDivElement, MouseEvent>;
  drawing: Drawings;
  updateDrawing: (id: number, payload: Drawings[0]) => void;
  id: number;
  compType: "arrow" | "pencil" | "image" | "shape" | "text";
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

function adjustArrow({
  e,
  drawing,
  updateDrawing,
  id,
  pos,
  canvasPos,
}: Omit<AdjustProp, "compType" | "location">) {
  const edit = { ...drawing[id] } as Drawings<"arrow">[0];
  if (pos === "start") {
    edit.prop.startPos = {
      x: e.clientX - canvasPos.x,
      y: e.clientY - canvasPos.y,
    };
  } else if (pos === "mid") {
    edit.prop.qCurve = {
      x: e.clientX - canvasPos.x,
      y: e.clientY - canvasPos.y,
    };
  } else if (pos === "end") {
    edit.prop.endPos = {
      x: e.clientX - canvasPos.x,
      y: e.clientY - canvasPos.y,
    };
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

function adjustPencil({
  e,
  drawing,
  updateDrawing,
  id,
  pos,
  canvasPos,
}: Omit<AdjustProp, "compType" | "location">) {
  const edit = { ...drawing[id] } as Drawings<"pencil">[0];

  if (pos === "start") {
    edit.prop.path.unshift(
      {
        func: "M",
        x: e.clientX - canvasPos.x,
        y: e.clientY - canvasPos.y,
      },
      {
        func: "L",
        x: edit.prop.path[0].x,
        y: edit.prop.path[0].y,
      }
    );
  } else if (pos === "end") {
    console.log("hi");
    edit.prop.path.push(
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
  updateDrawing(id, edit);
}
function adjustImage({
  e,
  drawing,
  updateDrawing,
  id,
  pos,
}: Omit<AdjustProp, "compType">) {
  const edit = { ...drawing[id] } as Drawings<"image">[0];
}
function adjustShape({
  e,
  drawing,
  updateDrawing,
  id,
  pos,
}: Omit<AdjustProp, "compType">) {
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
  updateDrawing!(id, edit);
}
function adjustText({
  e,
  drawing,
  updateDrawing,
  id,
  pos,
}: Omit<AdjustProp, "compType">) {
  const edit = { ...drawing[id] } as Drawings<"text">[0];
}
