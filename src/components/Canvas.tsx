import { useMemo, useRef, useState } from "react";
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
import useShortcuts from "../hooks/useShortcuts";
import useMovePencilAndArrowComp from "../hooks/useMovePencilAndArrowComp";

export default function Canvas() {
  const {
    updateDrawing,
    setDrawing,
    clearPointer,
    hideComp,
    toggleHighlight,
    hoverComp,
    leaveComp,
    highlightComp,
  } = useDrawing();
  const drawing = useDrawing((state) => state.getDrawing());

  const { highlighted, setHighlighted } = useHighlighted();
  const { activeTool, setActiveTool } = useActiveTool();
  const { general } = useGeneral();
  const drawingId = useRef(0);
  const [isToolActive, setIsToolActive] = useState(false);
  const [adjustCompId, setAdjustCompId] = useState<{
    id: number;
    type: "arrow" | "pencil" | "image" | "shape" | "text";
    pos: string;
  } | null>(null);
  const { canvasPos, canvasRef, setRef, setCanvasPos } = useCanvas();
  const loc = useLocation((state) => state.location);
  const { setActiveComp, activeComp } = useActive();
  const prevTool = useRef(activeTool);
  useAddImage(drawingId);
  useAddToActiveComp();
  useUpdateGeneral();
  useShortcuts();
  const movePencilOrArrow = useMovePencilAndArrowComp();
  const [moveCompId, setMoveCompId] = useState<number | null>(null);

  drawingId.current = useMemo(
    () => (!isToolActive ? drawing.length : drawingId.current),
    [drawing, isToolActive]
  );

  if (activeTool !== "pointer" && highlighted.length !== 0) {
    setHighlighted([]);
  }

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement | SVGCircleElement, MouseEvent>
  ) => {
    if (!canvasRef) {
      return;
    }

    // Reset highlighted components on tool change

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
          | "pencil"
          | "image"
          | "shape"
          | "text",
        pos: (e.target as SVGCircleElement).getAttribute("data-pos")!,
      });
      prevTool.current = activeTool;
      setActiveTool("pointer");
      return;
    }
    setIsToolActive(true);
    if (activeTool === "hand") {
      for (const id in loc) {
        if (Object.prototype.hasOwnProperty.call(loc, id)) {
          if (
            e.clientX > loc[id].x &&
            e.clientX < loc[id].x + loc[id].width &&
            e.clientY > loc[id].y &&
            e.clientY < loc[id].y + loc[id].height &&
            (drawing[id].prop.type === "pencil" ||
              drawing[id].prop.type === "arrow")
          ) {
            console.log("mover", id);
            setMoveCompId(+id);
            setActiveComp(+id);
            return;
          }
        }
      }
    }
    //TODO: Use temp storage to avoid issues
    addDrawing({
      e: {
        clientX:
          e.clientX -
          // canvasRef.getBoundingClientRect().width / 2 - //SCALING PROTOTYPE
          canvasRef.getBoundingClientRect().x,
        clientY:
          e.clientY -
          // canvasRef.getBoundingClientRect().height / 2 -
          canvasRef.getBoundingClientRect().y,
      },
      drawing,
      activeTool,
      general,
      setDrawing,
      drawingId,
    });
    setActiveComp(drawingId.current);
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
        location: loc,
        canvasPos,
      });
      return;
    }

    // Move components too flicker to do so themselves: pencil, arrow

    // Showcase hovered components
    if (!isToolActive) {
      if (
        activeTool === "pointer" ||
        activeTool === "hand" ||
        activeTool === "eraser"
      ) {
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

    if (activeTool === "hand") {
      if (!canvasRef) {
        return;
      }
      if (typeof moveCompId === "number") {
        console.log("move");
        movePencilOrArrow(moveCompId, e);
        return;
      }

      setCanvasPos({
        x: canvasPos.x + e.movementX,
        y: canvasPos.y + e.movementY,
      });
      canvasRef.style.transform = `translate(${canvasPos.x}px, ${canvasPos.y}px)`;
      return;
    }
    modifyDrawing({
      e: {
        clientX:
          e.clientX -
          // canvasRef.getBoundingClientRect().width / 2 -
          canvasRef.getBoundingClientRect().x,
        clientY:
          e.clientY -
          // canvasRef.getBoundingClientRect().height / 2 -
          canvasRef.getBoundingClientRect().y,
      },
      drawingId,
      activeTool,
      drawing,
      updateDrawing,
      general,
    });
    return;
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
    // Removing pointer
    if (drawing[drawing.length - 1]?.prop.type === "pointer") {
      cleanUpDrawing({
        drawing,
        clearPointer,
      });
    }
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

    if (
      activeTool === "pointer" ||
      activeTool === "eraser" ||
      activeTool === "hand"
    ) {
      // First implementation
      for (const id in loc) {
        if (Object.prototype.hasOwnProperty.call(loc, id)) {
          if (
            e.clientX > loc[id].x &&
            e.clientX < loc[id].x + loc[id].width &&
            e.clientY > loc[id].y &&
            e.clientY < loc[id].y + loc[id].height
          ) {
            if (activeTool === "pointer" || activeTool === "hand") {
              if (!drawing[id].highlight) {
                highlightComp(+id);
                setActiveComp(+id);
              }
            } else {
              removeComp(+id, hideComp);
            }
          } else {
            !activeComp.includes(+id) && toggleHighlight(+id);
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
    setMoveCompId(null);
    return;
  };

  const components = drawing.map(drawOnCanvas);
  return (
    <div
      onPointerDown={handleMouseDown}
      onPointerMove={handleMouseMove}
      onPointerUp={handleMouseUp}
      onPointerLeave={() => {
        // Removing pointer
        if (drawing[drawing.length - 1]?.prop.type === "pointer") {
          cleanUpDrawing({
            drawing,
            clearPointer,
          });
        }
      }}
      className="absolute inset-0 w-screen h-screen canvas bg overflow-clip"
    >
      <div
        className="absolute inset-0 w-screen h-screen canvas touch-none"
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
