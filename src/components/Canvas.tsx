import { useRef, useState } from "react";
import { ActiveTool, General } from "../App";
import {
  addDrawing,
  cleanUpDrawing,
  drawOnCanvas,
  modifyDrawing,
} from "../utils/drawings";
import { type ArrowProp } from "./drawings/Arrow";
import { type ImageProp } from "./drawings/Image";
import { type NoteProp } from "./drawings/Note";
import { type PencilProp } from "./drawings/Pencil";
import { type PointerProp } from "./drawings/Pointer";
import { type TextProp } from "./drawings/Text";
import { type ShapesProp } from "./drawings/Shapes";
import { type EraserProp } from "./drawings/Eraser";
import { type HandProp } from "./drawings/Hand";
import { act } from "react-dom/test-utils";

type Prop = {
  activeTool: ActiveTool;
  general: General;
  setActiveTool: React.Dispatch<React.SetStateAction<ActiveTool>>;
};
export type Drawings = (
  | ArrowProp
  | ImageProp
  | NoteProp
  | PencilProp
  | PointerProp
  | TextProp
  | ShapesProp
  | EraserProp
  | HandProp
)[];
export type Location = { x: number; y: number; width: number; height: number };
export default function Canvas({ activeTool, general, setActiveTool }: Prop) {
  const [drawing, setDrawing] = useState<Drawings>([]);
  const [location, setLocation] = useState<Location[]>([]);
  const [isToolActive, setIsToolActive] = useState(false);
  const activeCompRef = useRef<HTMLElement | null>(null);

  const drawingId = useRef(0);
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsToolActive(true);

    addDrawing({
      e,
      activeTool,
      setDrawing,
      drawingId,
      general,
    });
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isToolActive) {
      return;
    }

    modifyDrawing({
      e,
      activeTool,
      setDrawing,
      drawingId,
      general,
    });
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
      if (
        prev === "image" ||
        prev === "note" ||
        prev === "text" ||
        prev === "hand"
      ) {
        return "pointer";
      }
      return prev;
    });
    setIsToolActive(false);
  };
  /*   useEffect(() => {
    // Update Specific Component general attribute
  }, [general.color, general.dash, general.opacity, general.scale, general.strokeWidth]) // Feeling lazy to refactor general into {diffs: {}, image: []} */
  const components = drawing.map((x) => drawOnCanvas(x, activeCompRef));
  return (
    <div
      className="absolute inset-0 w-screen h-screen canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {components}
    </div>
  );
}

/* 
  For multi selector, keep store of every components box location and then do the magic

*/
