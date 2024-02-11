import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ActiveTool, Drawings, General } from "../types/general";
import {
  addDrawing,
  cleanUpDrawing,
  drawOnCanvas,
  modifyDrawing,
} from "../utils/drawings";

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
type Prop = {
  activeTool: ActiveTool;
  general: General;
  setActiveTool: React.Dispatch<React.SetStateAction<ActiveTool>>;
};

export default function Canvas({ activeTool, general, setActiveTool }: Prop) {
  const [drawing, setDrawing] = useState<Drawings>([]);
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const [isToolActive, setIsToolActive] = useState(false);
  const activeCompRef = useRef<HTMLElement | null>(null);
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
  useEffect(() => {
    if (activeTool !== "pointer" && highlighted.length !== 0) {
      setHighlighted([]);
    }
  }, [activeTool]);

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
      <ActiveToolProvider.Provider value={activeTool}>
        <Highlighted.Provider value={setHighlighted}>
          <DrawingDispatch.Provider value={setDrawing}>
            {components}
          </DrawingDispatch.Provider>
        </Highlighted.Provider>
      </ActiveToolProvider.Provider>
    </div>
  );
}

/* 
  For multi selector, keep store of every components box location and then do the magic

*/

/* 
<svg class="tl-svg-context"><defs><g data-testid="ready-pattern-fill-defs"><pattern id="hash_pattern_zoom_1_light" width="8" height="8" patternUnits="userSpaceOnUse"><image href="blob:https://www.tldraw.com/99e95bf5-1475-4c43-ad9e-16a6d2ae946e" width="8" height="8"></image></pattern><pattern id="hash_pattern_zoom_1_dark" width="8" height="8" patternUnits="userSpaceOnUse"><image href="blob:https://www.tldraw.com/95baad9f-3812-4d82-9e5d-8f4cce0d1fc0" width="8" height="8"></image></pattern><pattern id="hash_pattern_zoom_2_light" width="8" height="8" patternUnits="userSpaceOnUse"><image href="blob:https://www.tldraw.com/d21562b8-4787-4904-8817-bbabff2c240b" width="8" height="8"></image></pattern><pattern id="hash_pattern_zoom_2_dark" width="8" height="8" patternUnits="userSpaceOnUse"><image href="blob:https://www.tldraw.com/26f26826-827e-4ca4-9235-569cc9d3ce92" width="8" height="8"></image></pattern><pattern id="hash_pattern_zoom_3_light" width="8" height="8" patternUnits="userSpaceOnUse"><image href="blob:https://www.tldraw.com/181110ff-aab2-4897-9b7d-b28234bfe079" width="8" height="8"></image></pattern><pattern id="hash_pattern_zoom_3_dark" width="8" height="8" patternUnits="userSpaceOnUse"><image href="blob:https://www.tldraw.com/7d8c9de4-76fd-42f0-adc0-f87d3578569c" width="8" height="8"></image></pattern><pattern id="hash_pattern_zoom_4_light" width="8" height="8" patternUnits="userSpaceOnUse"><image href="blob:https://www.tldraw.com/f6846c8b-799b-4c10-92b5-26948c6f7e69" width="8" height="8"></image></pattern><pattern id="hash_pattern_zoom_4_dark" width="8" height="8" patternUnits="userSpaceOnUse"><image href="blob:https://www.tldraw.com/9e10a44a-c787-4719-8a51-c7f2ee69ec5f" width="8" height="8"></image></pattern><pattern id="hash_pattern_zoom_5_light" width="8" height="8" patternUnits="userSpaceOnUse"><image href="blob:https://www.tldraw.com/3696f393-fc41-4c53-9f32-ea52b27e525b" width="8" height="8"></image></pattern><pattern id="hash_pattern_zoom_5_dark" width="8" height="8" patternUnits="userSpaceOnUse"><image href="blob:https://www.tldraw.com/8eb38e4f-1d70-48f0-b944-a2f27d608389" width="8" height="8"></image></pattern><pattern id="hash_pattern_zoom_6_light" width="8" height="8" patternUnits="userSpaceOnUse"><image href="blob:https://www.tldraw.com/5ca27801-606a-4ad0-811f-c3ed0ebacbc3" width="8" height="8"></image></pattern><pattern id="hash_pattern_zoom_6_dark" width="8" height="8" patternUnits="userSpaceOnUse"><image href="blob:https://www.tldraw.com/645105ff-ce3c-4ed9-938b-8302f2cb3129" width="8" height="8"></image></pattern><pattern id="hash_pattern_zoom_7_light" width="8" height="8" patternUnits="userSpaceOnUse"><image href="blob:https://www.tldraw.com/c7eb4301-8181-426c-beb1-1e30b6a47957" width="8" height="8"></image></pattern><pattern id="hash_pattern_zoom_7_dark" width="8" height="8" patternUnits="userSpaceOnUse"><image href="blob:https://www.tldraw.com/a791753e-fe1a-448f-9dd8-3b4d043e5070" width="8" height="8"></image></pattern><pattern id="hash_pattern_zoom_8_light" width="8" height="8" patternUnits="userSpaceOnUse"><image href="blob:https://www.tldraw.com/010335b0-2056-4ac8-bfa0-4b8363fdb43b" width="8" height="8"></image></pattern><pattern id="hash_pattern_zoom_8_dark" width="8" height="8" patternUnits="userSpaceOnUse"><image href="blob:https://www.tldraw.com/27e51d29-50ee-40db-bba9-2f56d778bbeb" width="8" height="8"></image></pattern></g><g id="cursor"><g fill="rgba(0,0,0,.2)" transform="translate(-11,-11)"><path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z"></path><path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z"></path></g><g fill="white" transform="translate(-12,-12)"><path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z"></path><path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z"></path></g><g fill="currentColor" transform="translate(-12,-12)"><path d="m19.751 24.4155-1.844.774-3.1-7.374 1.841-.775z"></path><path d="m13 10.814v11.188l2.969-2.866.428-.139h4.768z"></path></g></g><path id="cursor_hint" fill="currentColor" d="M -2,-5 2,0 -2,5 Z"></path><marker id="arrowhead-dot" class="tl-arrow-hint" refX="3.0" refY="3.0" orient="0"><circle cx="3" cy="3" r="2" stroke-dasharray="100%"></circle></marker><marker id="arrowhead-cross" class="tl-arrow-hint" refX="3.0" refY="3.0" orient="auto"><line x1="1.5" y1="1.5" x2="4.5" y2="4.5" stroke-dasharray="100%"></line><line x1="1.5" y1="4.5" x2="4.5" y2="1.5" stroke-dasharray="100%"></line></marker></defs></svg>
*/
