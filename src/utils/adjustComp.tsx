import { ActiveTool, Drawings } from "../types/general";

type AdjustProp = {
  e: React.MouseEvent<SVGCircleElement | HTMLDivElement, MouseEvent>;
  activeTool: ActiveTool;
  drawing: Drawings;
  setActiveTool: (payload: ActiveTool) => void;
  updateDrawing: (id: number, payload: Drawings[0]) => void;
};

export default function adjustComp({
  e,
  activeTool,
  setActiveTool,
  drawing,
  updateDrawing,
}: AdjustProp) {
  if ((e.target as SVGCircleElement).getAttribute("data-comp") === "arrow")
    return adjustArrow({
      e,
      activeTool,
      setActiveTool,
      drawing,
      updateDrawing,
    });
  else if (
    (e.target as SVGCircleElement).getAttribute("data-comp") === "pencil"
  )
    return adjustPencil({
      e,
      activeTool,
      setActiveTool,
      drawing,
      updateDrawing,
    });
  else if ((e.target as SVGCircleElement).getAttribute("data-comp") === "image")
    return adjustImage({
      e,
      activeTool,
      setActiveTool,
      drawing,
      updateDrawing,
    });
  else;
}

function adjustArrow({
  e,
  activeTool,
  setActiveTool,
  drawing,
  updateDrawing,
}: AdjustProp) {
  if (e.type === "mousedown") {
    console.log("mousedown");
    if ((e.target as SVGCircleElement).getAttribute("data-pos") === "top") {
    } else if (
      (e.target as SVGCircleElement).getAttribute("data-pos") === "mid"
    ) {
    } else if (
      (e.target as SVGCircleElement).getAttribute("data-pos") === "end"
    ) {
    }
  } else if (e.type === "mousemove") {
  } else if (e.type === "mouseup") {
  }
  // Check which circle is active
}

function adjustPencil({
  e,
  activeTool,
  setActiveTool,
  drawing,
  updateDrawing,
}: AdjustProp) {
  if (e.type === "mousedown") {
  } else if (e.type === "mousemove") {
  } else if (e.type === "mouseup") {
  }
}

function adjustImage({
  e,
  activeTool,
  setActiveTool,
  drawing,
  updateDrawing,
}: AdjustProp) {
  if (e.type === "mousedown") {
  } else if (e.type === "mousemove") {
  } else if (e.type === "mouseup") {
  }
}
