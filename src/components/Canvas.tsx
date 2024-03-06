import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import {
  addDrawing,
  cleanUpDrawing,
  drawOnCanvas,
  modifyDrawing,
  removeComp,
} from "../utils/drawings";
import {
  useActiveTool,
  useCanvas,
  useDrawing,
  useGeneral,
  useHighlighted,
  useImage,
  useLocation,
} from "../store/Store";
import { Drawings } from "../types/general";

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
  } = useDrawing();
  const { highlighted, setHighlighted } = useHighlighted();
  const { activeTool, setActiveTool } = useActiveTool();
  const { general } = useGeneral();

  const drawingId = useRef(0);
  const [isToolActive, setIsToolActive] = useState(false);
  const activeCompRef = useRef<HTMLElement | number[] | null>(null);
  const { image } = useImage();
  const { canvasPos, canvasRef, setRef, setCanvasPos } = useCanvas();
  const loc = useLocation((state) => state.location);
  useEffect(() => {
    if (!image) {
      return;
    }
    const newImageComp = {
      id: image.id,
      prop: {
        type: "image",
        src: image.src,
        alt: "Image uploaded by user",
        width: image.width,
        height: image.height,
      },
      pos: {
        x: innerWidth / 2,
        y: Math.max(innerHeight / 2 - image.height / 2, 10),
      },
    } satisfies Drawings<"image">[0];
    setDrawing(newImageComp);
    ++drawingId.current;
  }, [image]);

  useEffect(() => {
    if (highlighted.length === 0) {
      return;
    }
    activeCompRef.current = [];
    highlighted.forEach((id) => {
      (activeCompRef.current as number[]).push(id);
      if (!drawing[id]) return;
      updateDrawing(id, { ...drawing[id], highlight: true });
    });
  }, [highlighted]);

  useEffect(() => {
    if (!activeCompRef.current) return;
    if (Array.isArray(activeCompRef.current)) {
      (activeCompRef.current as number[]).forEach((id) => {
        if (!drawing[id]) return;
        updateDrawing(id, {
          ...drawing[id],
          color: general.color,
          dash: general.dash,
          opacity: general.opacity,
          strokeWidth: general.strokeWidth,
        });
      });
      return;
    }
    const id = +(activeCompRef.current as HTMLElement).id;
    if (!drawing[id]) return;
    const update = {
      ...drawing[id],
      color: general.color,
      dash: general.dash,
      opacity: general.opacity,
      strokeWidth: general.strokeWidth,
    };
    if (update.prop.type === "note" || update.prop.type === "text") {
      update.font = general.font;
    }
    updateDrawing(id, update);
  }, [
    general.color,
    general.dash,
    general.opacity,
    general.scale,
    general.strokeWidth,
    general.font,
  ]);

  if (activeTool !== "pointer" && highlighted.length !== 0) {
    // highlighted.forEach((id) => {
    //   updateDrawing(id, { ...drawing[id], highlight: false });
    // });
    setHighlighted([]);
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!canvasRef) {
      return;
    }

    setIsToolActive(true);
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
      image,
    });
    if (activeTool === "eraser") {
      // First implementation
      const id = +(e.target as HTMLElement).id ?? -1;
      removeComp(id, hideComp);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!canvasRef) {
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
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    cleanUpDrawing({
      e,
      drawingId,
      drawing,
      clearPointer,
      activeTool,
      general,
    });
    if (!(activeTool === "pointer" || activeTool === "hand")) {
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
              toggleHighlight(+id);
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

  const components = drawing.map((x) =>
    drawOnCanvas(x, activeCompRef as RefObject<HTMLElement>)
  );
  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClickCapture={() => console.log("clk")}
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
