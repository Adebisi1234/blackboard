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
export default function Canvas({ activeTool, general, setActiveTool }: Prop) {
  const [drawing, setDrawing] = useState<Drawings>([]);
  const [isToolActive, setIsToolActive] = useState(false);
  const drawingId = useRef(-1);
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    drawingId.current++;
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
    setActiveTool("pointer");
    setIsToolActive(false);
  };
  /*   useEffect(() => {
    // Update Specific Component general attribute
  }, [general.color, general.dash, general.opacity, general.scale, general.strokeWidth]) // Feeling lazy to refactor general into {diffs: {}, image: []} */
  const components = drawing.map(drawOnCanvas);
  console.log(drawingId.current);
  return (
    <div
      className="absolute inset-0 min-h-screen min-w-screen canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {components}
    </div>
  );
}

/* 
  For multi selector, keep store of every point the on hover the point select all svgs with those points

*/
