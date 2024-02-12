import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ActiveTool, Drawings, General } from "../types/general";
import {
  addDrawing,
  cleanUpDrawing,
  drawOnCanvas,
  modifyDrawing,
} from "../utils/drawings";
import Button from "./ui/Button";
import { createPortal } from "react-dom";
type Prop = {
  activeTool: ActiveTool;
  general: General;
  setActiveTool: React.Dispatch<React.SetStateAction<ActiveTool>>;
};
type Pan = {
  x: number;
  y: number;
};

const ActiveToolProvider = createContext<ActiveTool>("pointer");
const Highlighted = createContext<
  React.Dispatch<React.SetStateAction<number[]>>
>(null!);
const DrawingDispatch = createContext<
  React.Dispatch<React.SetStateAction<Drawings>>
>(null!);
export const useActiveTool = () => useContext(ActiveToolProvider);
export const useHighlighted = () => useContext(Highlighted);
export const useDrawingDispatch = () => useContext(DrawingDispatch);

export default function Canvas({ activeTool, general, setActiveTool }: Prop) {
  const [drawing, setDrawing] = useState<Drawings>([]);
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const posRef = useRef({ x: 0, y: 0 });
  const [isToolActive, setIsToolActive] = useState(false);
  const activeCompRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (highlighted.length === 0) {
      return;
    }
    setDrawing((prev) => {
      const temp = [...prev];
      highlighted.forEach((id) => {
        if (id === -1) return;

        temp[id] = { ...temp[id], highlight: true };
      });

      return temp;
    });
  }, [highlighted]);

  if (activeTool !== "pointer" && highlighted.length !== 0) {
    setHighlighted([]);
  }

  const drawingId = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsToolActive(true);
    console.log(e.movementX);
    addDrawing({
      e: {
        clientX: e.clientX - canvasRef.current!.getBoundingClientRect().x,
        clientY: e.clientY - canvasRef.current!.getBoundingClientRect().y,
      },
      activeTool,
      setDrawing,
      drawingId,
      general,
    });
    if (activeTool === "hand") {
      // First implementation
    }
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isToolActive) {
      return;
    }

    modifyDrawing({
      e: {
        clientX: e.clientX - canvasRef.current!.getBoundingClientRect().x,
        clientY: e.clientY - canvasRef.current!.getBoundingClientRect().y,
      },
      activeTool,
      setDrawing,
      drawingId,
      general,
    });
    if (activeTool === "hand") {
      // First implementation
      if (!canvasRef.current) {
        return;
      }
      posRef.current.x += e.movementX;
      posRef.current.y += e.movementY;
      canvasRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
    }
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    cleanUpDrawing({
      e,
      activeTool,
      setDrawing,
      drawingId,
      general,
    });
    if (activeTool !== "pointer") {
      drawingId.current++;
    }
    setActiveTool((prev) => {
      if (prev === "image" || prev === "note" || prev === "text") {
        return "pointer";
      }
      return prev;
    });
    setIsToolActive(false);
  };

  function BackToContent() {
    return (
      <Button
        className="!absolute px-2 py-1 mt-2 rounded-md top-full left-2 w-fit bg-[#333438] z-20"
        onMouseDown={() => {
          if (!canvasRef.current) return;
          canvasRef.current.style.transform = "translate(0,0)";
          posRef.current = { x: 0, y: 0 };
        }}
      >
        <p>Back to Content</p>
      </Button>
    );
  }
  /*   useEffect(() => {
    // Update Specific Component general attribute
  }, [general.color, general.dash, general.opacity, general.scale, general.strokeWidth]) // Feeling lazy to refactor general into {diffs: {}, image: []} */
  const components = drawing.map((x) => drawOnCanvas(x, activeCompRef));
  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="absolute inset-0 w-screen h-screen canvas"
    >
      <div
        className="absolute inset-0 w-screen h-screen canvas"
        ref={canvasRef}
      >
        <ActiveToolProvider.Provider value={activeTool}>
          <Highlighted.Provider value={setHighlighted}>
            <DrawingDispatch.Provider value={setDrawing}>
              {components}
              {(posRef.current.x > 500 || posRef.current.y > 500) &&
                createPortal(
                  <BackToContent />,
                  document.getElementById("pages")!
                )}
            </DrawingDispatch.Provider>
          </Highlighted.Provider>
        </ActiveToolProvider.Provider>
      </div>
    </div>
  );
}

/* 
  For multi selector, keep store of every components box location and then do the magic

*/
