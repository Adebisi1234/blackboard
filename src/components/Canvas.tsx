import { useRef, useState } from "react";
import {
  addDrawing,
  cleanUpDrawing,
  drawOnCanvas,
  modifyDrawing,
  removeComp,
} from "../utils/drawings";
import {
  useActive,
  useActiveTool,
  useCanvas,
  useDrawing,
  useGeneral,
  useHighlighted,
  useImage,
  useLocation,
} from "../store/Store";
import useAddImage from "../hooks/useAddImage";
import useAddToActiveComp from "../hooks/useAddToActiveComp";
import useUpdateGeneral from "../hooks/useUpdateGeneral";
import adjustComp from "../utils/adjustComp";

export default function Canvas() {
  const {
    drawing,
    updateDrawing,
    setDrawing,
    clearPointer,
    hideComp,
    toggleHighlight,
    hoverComp,
    leaveComp,
    highlightComp,
  } = useDrawing();
  const { highlighted, setHighlighted } = useHighlighted();
  const { activeTool, setActiveTool } = useActiveTool();
  const { general } = useGeneral();

  const drawingId = useRef(0);
  const [isToolActive, setIsToolActive] = useState(false);
  const [adjustCompId, setAdjustCompId] = useState<{
    id: number;
    type: "arrow" | "others";
    pos: string;
  } | null>(null);
  const { canvasPos, canvasRef, setRef, setCanvasPos } = useCanvas();
  const loc = useLocation((state) => state.location);
  const { setActiveComp, activeComp } = useActive();
  const prevTool = useRef(activeTool);
  useAddImage(drawingId.current);
  useAddToActiveComp();
  useUpdateGeneral();

  if (activeTool !== "pointer" && highlighted.length !== 0) {
    // highlighted.forEach((id) => {
    //   updateDrawing(id, { ...drawing[id], highlight: false });
    // });
    setHighlighted([]);
  }

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement | SVGCircleElement, MouseEvent>
  ) => {
    if (!canvasRef) {
      return;
    }
    if (
      !(
        activeTool === "pointer" ||
        activeTool === "eraser" ||
        activeTool === "hand"
      ) &&
      !(e.target as SVGCircleElement).classList.contains("adjust") &&
      drawing[activeComp[activeComp.length - 1]]
    ) {
      toggleHighlight(activeComp[activeComp.length - 1]);
    }

    // Adjusting Existing comp
    if ((e.target as SVGCircleElement).classList.contains("adjust")) {
      setAdjustCompId({
        id: +(e.target as SVGCircleElement).getAttribute("data-comp-id")!,
        type: (e.target as SVGCircleElement).getAttribute("data-comp")! as
          | "arrow"
          | "others",
        pos: (e.target as SVGCircleElement).getAttribute("data-pos")!,
      });
      prevTool.current = activeTool;
      setActiveTool("pointer");
      return;
    }
    setIsToolActive(true);
    //TODO: Use temp storage to avoid issues
    addDrawing({
      e: {
        clientX: e.clientX - canvasRef.getBoundingClientRect().x,
        clientY: e.clientY - canvasRef.getBoundingClientRect().y,
      },
      drawing,
      activeTool,
      general,
      setDrawing,
      drawingId,
    });
    setActiveComp(drawingId.current);

    if (activeTool === "eraser") {
      // First implementation
      const id = +(e.target as HTMLElement).id ?? -1;
      removeComp(id, hideComp);
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement | SVGCircleElement, MouseEvent>
  ) => {
    if (!canvasRef) {
      return;
    }
    // Adjusting Existing comp
    if (adjustCompId) {
      adjustComp({
        e,
        drawing,
        updateDrawing,
        id: adjustCompId.id,
        compType: adjustCompId.type,
        pos: adjustCompId.pos,
      });
      return;
    }
    if (!isToolActive) {
      if (activeTool === "pointer") {
        // First implementation
        for (const id in loc) {
          if (Object.prototype.hasOwnProperty.call(loc, id)) {
            if (
              e.clientX > loc[id].x &&
              e.clientX < loc[id].x + loc[id].width &&
              e.clientY > loc[id].y &&
              e.clientY < loc[id].y + loc[id].height
            ) {
              if (!drawing[id].hovered) {
                hoverComp(+id);
              }
            } else {
              if (drawing[id].hovered) {
                leaveComp(+id);
              }
            }
          }
        }
      }
      return;
    }

    modifyDrawing({
      e: {
        clientX: e.clientX - canvasRef.getBoundingClientRect().x,
        clientY: e.clientY - canvasRef.getBoundingClientRect().y,
      },
      drawingId,
      activeTool,
      drawing,
      updateDrawing,
      general,
    });
    if (activeTool === "hand") {
      if (!canvasRef) {
        return;
      }
      canvasPos.x += e.movementX;
      canvasPos.y += e.movementY;
      canvasRef.style.transform = `translate(${canvasPos.x}px, ${canvasPos.y}px)`;
      setCanvasPos(canvasPos);
    }
  };
  const handleMouseUp = (
    e: React.MouseEvent<HTMLDivElement | SVGCircleElement, MouseEvent>
  ) => {
    // Adjusting Existing comp
    if (adjustCompId) {
      toggleHighlight(adjustCompId.id);
      setAdjustCompId(null);
      setActiveTool(prevTool.current);
      return;
    }
    cleanUpDrawing({
      e,
      drawingId,
      drawing,
      clearPointer,
      activeTool,
      general,
    });
    if (
      !(
        activeTool === "eraser" ||
        activeTool === "hand" ||
        activeTool === "pointer"
      ) &&
      drawing[activeComp[activeComp.length - 1]]
    ) {
      highlightComp(activeComp[activeComp.length - 1]);
    }
    if (drawing[drawingId.current]?.prop?.type !== "pointer") {
      drawingId.current++;
    }
    if (activeTool === "pointer") {
      // First implementation
      for (const id in loc) {
        if (Object.prototype.hasOwnProperty.call(loc, id)) {
          if (
            e.clientX > loc[id].x &&
            e.clientX < loc[id].x + loc[id].width &&
            e.clientY > loc[id].y &&
            e.clientY < loc[id].y + loc[id].height
          ) {
            if (!drawing[id].highlight) {
              highlightComp(+id);
            }
          }
        }
      }
    }
    if (
      activeTool === "image" ||
      activeTool === "note" ||
      activeTool === "text"
    ) {
      setActiveTool("pointer");
    }
    setIsToolActive(false);
  };

  const components = drawing.map(drawOnCanvas);
  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="absolute inset-0 w-screen h-screen canvas bg"
    >
      <div
        className="absolute inset-0 w-screen h-screen canvas"
        ref={(node) => {
          if (!node || canvasRef) return;
          setRef(node);
        }}
      >
        {components}
      </div>
    </div>
  );
}

/* 
  For multi selector, keep store of every components box location and then do the magic

*/
