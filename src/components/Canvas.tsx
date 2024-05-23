import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  useLocation,
} from "../store/Store";
import useAddImage from "../hooks/useAddImage";
import useAddToActiveComp from "../hooks/useAddToActiveComp";
import useUpdateGeneral from "../hooks/useUpdateGeneral";
import adjustComp from "../utils/adjustComp";
import useShortcuts from "../hooks/useShortcuts";
import useMovePencilAndArrowComp from "../hooks/useMovePencilAndArrowComp";
import { Cursor } from "./ui/Svg";

export default function Canvas() {
  const {
    init,
    updateDrawing,
    setDrawing,
    clearPointer,
    hideComp,
    toggleHighlight,
    hoverComp,
    leaveComp,
    highlightComp,
    readOnly,
    ws,
    userId,
    userOffline,
  } = useDrawing();
  const room = new URL(location.toString()).searchParams.get("room") ?? "";
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
  const [cursors, setCursors] = useState<
    Record<string, { x: number; y: number }>
  >({});

  useEffect(() => {
    if (room) {
      ws?.addEventListener("open", () => {
        console.log("ws connected");
        !readOnly && userOffline(false);
      });
      ws?.addEventListener("message", (ev) => {
        let message = JSON.parse(ev.data);
        if (message.cursor) {
          setCursors((prev) => {
            const temp = { ...prev };
            temp[message.cursor.userId] = message.cursor.pos;
            return temp;
          });
          return;
        }
        init(message);
      });
    }
  }, [room, ws]);

  useEffect(() => {
    if (!canvasRef) return;
    canvasRef.style.transform = `translate(${canvasPos.x}px, ${canvasPos.y}px)`;
  }, [canvasPos]);

  drawingId.current = useMemo(
    () => (!isToolActive ? drawing.length : drawingId.current),
    [drawing, isToolActive]
  );

  if (activeTool !== "pointer" && highlighted.length !== 0) {
    setHighlighted([]);
  }

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement | SVGCircleElement>) => {
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
            // canvasRef.getBoundingClientRect().width / 4 - //SCALING PROTOTYPE
            canvasPos.x,
          clientY:
            e.clientY -
            // canvasRef.getBoundingClientRect().height / 4 -
            canvasPos.y,
        },
        drawing,
        activeTool,
        general,
        setDrawing,
        drawingId,
      });
      setActiveComp(drawingId.current);
    },
    [canvasRef, activeTool, drawing, prevTool, general, loc]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement | SVGCircleElement>) => {
      if (!canvasRef) {
        return;
      }
      if (navigator.onLine && ws?.readyState === ws?.OPEN) {
        ws?.send(
          JSON.stringify({
            message: {
              cursor: {
                userId,
                pos: {
                  x: e.clientX - canvasPos.x,
                  y: e.clientY - canvasPos.y,
                },
              },
              timestamps: Date.now(),
            },
            id: userId,
          })
        );
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

      // Move components too flicker to do so themselves: pencil, arrow and also canvas

      if (activeTool === "hand") {
        if (!canvasRef) {
          return;
        }
        if (typeof moveCompId === "number") {
          movePencilOrArrow(drawing[moveCompId], e);
          return;
        }
        if (!e.bubbled) {
          setCanvasPos({
            x: canvasPos.x + e.movementX,
            y: canvasPos.y + e.movementY,
          });
        }
        return;
      }
      modifyDrawing({
        e: {
          clientX:
            e.clientX -
            // canvasRef.getBoundingClientRect().width / 4 -
            canvasPos.x,
          clientY:
            e.clientY -
            // canvasRef.getBoundingClientRect().height / 4 -
            canvasPos.y,
        },
        drawingId,
        activeTool,
        drawing,
        updateDrawing,
        general,
      });
      return;
    },
    [
      canvasRef,
      userId,
      canvasPos,
      activeTool,
      drawing,
      isToolActive,
      ws,
      moveCompId,
      general,
      loc,
      adjustCompId,
    ]
  );
  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement | SVGCircleElement>) => {
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
    },
    [activeTool, drawing, loc, adjustCompId]
  );

  const components = drawing.map(drawOnCanvas);

  const cursorEl = Object.keys(cursors).map((userId) => {
    return <Cursor pos={cursors[userId]} key={userId}></Cursor>;
  });
  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`absolute inset-0 w-screen h-screen canvas bg overflow-clip ${
        readOnly && "pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 w-screen h-screen canvas touch-none"
        ref={(node) => {
          if (!node || canvasRef) return;
          setRef(node);
        }}
        id="blackboard"
      >
        {cursorEl}
        {components}
      </div>
    </div>
  );
}

/* 
  For multi selector, keep store of every components box location and then do the magic

*/
