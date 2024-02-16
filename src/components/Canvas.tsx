import {
  RefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ActiveTool, Drawings, General } from "../types/general";
import {
  addDrawing,
  cleanUpDrawing,
  drawOnCanvas,
  modifyDrawing,
  removeComp,
} from "../utils/drawings";
import Button from "./ui/Button";
import { createPortal } from "react-dom";
import { NoteProp } from "./drawings/Note";
import Minimap from "./ui/Minimap";
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
const DrawingCtx = createContext<Drawings>([]);
export const useActiveTool = () => useContext(ActiveToolProvider);
export const useHighlighted = () => useContext(Highlighted);
export const useDrawing = () => useContext(DrawingCtx);
export const useDrawingDispatch = () => useContext(DrawingDispatch);

export default function Canvas({ activeTool, general, setActiveTool }: Prop) {
  const [drawing, setDrawing] = useState<Drawings>([]);
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const posRef = useRef({ x: 0, y: 0 });
  const [isToolActive, setIsToolActive] = useState(false);
  const activeCompRef = useRef<HTMLElement | number[] | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (highlighted.length === 0) {
      return;
    }
    activeCompRef.current = [];

    setDrawing((prev) => {
      const temp = [...prev];
      highlighted.forEach((id) => {
        if (id === -1) return;
        (activeCompRef.current as number[]).push(id);
        if (!temp[id]) return;
        temp[id] = { ...temp[id], highlight: true };
      });

      return temp;
    });
  }, [highlighted]);

  useEffect(() => {
    if (!activeCompRef.current) return;
    if (Array.isArray(activeCompRef.current)) {
      setDrawing((prev) => {
        const temp = [...prev];
        (activeCompRef.current as number[]).forEach((id) => {
          if (!temp[id]) return;
          temp[id] = {
            ...temp[id],
            color: general.color,
            dash: general.dash,
            opacity: general.opacity,
          };
        });
        return temp;
      });
    }
    const id = +(activeCompRef.current as HTMLElement).id;
    setDrawing((prev) => {
      const temp = [...prev];

      temp[id] = {
        ...temp[id],
        color: general.color,
        dash: general.dash,
        opacity: general.opacity,
      };
      if (temp[id].type === "note" || temp[id].type === "text") {
        (temp[id] as NoteProp).font = general.font;
      }
      return temp;
    });
  }, [
    general.color,
    general.dash,
    general.opacity,
    general.scale,
    general.strokeWidth,
    general.font,
  ]); // Feeling lazy to refactor general into {diffs: {}, image: []}

  if (activeTool !== "pointer" && highlighted.length !== 0) {
    setHighlighted([]);
  }

  const drawingId = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsToolActive(true);
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
    if (activeTool === "eraser") {
      // First implementation
      const id = +(e.target as HTMLElement).id ?? -1;
      removeComp(id, setDrawing);
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
    if (!(activeTool === "pointer" || activeTool === "hand")) {
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
        ref={canvasRef}
      >
        <ActiveToolProvider.Provider value={activeTool}>
          <Highlighted.Provider value={setHighlighted}>
            <DrawingDispatch.Provider value={setDrawing}>
              <DrawingCtx.Provider value={drawing}>
                <Minimap
                  translateX={posRef.current.x}
                  translateY={posRef.current.y}
                />
                {components}
                {(posRef.current.x > 500 || posRef.current.y > 500) &&
                  createPortal(
                    <BackToContent />,
                    document.getElementById("pages")!
                  )}
              </DrawingCtx.Provider>
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
