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
} from "../store/Store";

export default function Canvas() {
  const { drawing, updateDrawing, setDrawing, clearPointer, hideComp } =
    useDrawing();
  const { highlighted, reset } = useHighlighted();
  const { activeTool, setActiveTool } = useActiveTool();
  const { general } = useGeneral();

  const posRef = useRef({ x: 0, y: 0 });
  const drawingId = useRef(0);
  const [isToolActive, setIsToolActive] = useState(false);
  const activeCompRef = useRef<HTMLElement | number[] | null>(null);
  const { image, clearImage } = useImage();
  const { canvasPos, canvasRef, setRef } = useCanvas();
  // const minX = 0 - canvasPos.x;
  // const minY = 0 - canvasPos.y;
  // const totalWidth = innerWidth + Math.abs(posRef.current.x);
  // const totalHeight = innerHeight + Math.abs(posRef.current.y);

  useEffect(() => {
    if (highlighted.length === 0) {
      return;
    }
    activeCompRef.current = [];
    highlighted.forEach((id) => {
      if (id === -1) return;
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
    }
    const id = +(activeCompRef.current as HTMLElement).id;

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
  ]); // Feeling lazy to refactor general into {diffs: {}, image: []}

  if (activeTool !== "pointer" && highlighted.length !== 0) {
    reset();
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
      clearImage,
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
      // First implementation
      if (!canvasRef) {
        return;
      }
      posRef.current.x += e.movementX;
      posRef.current.y += e.movementY;
      canvasRef.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
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
      className="absolute inset-0 w-screen h-screen canvas"
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
