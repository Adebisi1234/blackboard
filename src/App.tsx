import { useRef, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import Disclaimer from "./components/ui/Disclaimer";
import Overlay from "./components/ui/UiOverlay";

export type ActiveTool =
  | "pointer"
  | "hand"
  | "pencil"
  | "eraser"
  | "arrow"
  | "text"
  | "note"
  | "image"
  | "shape";

export type General = {
  color: string;
  opacity: number;
  strokeWidth: number;
  dash: "draw" | "solid" | "dashed" | "dotted";
  scale: number;
  font: number;
  image: {
    id: number;
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
};
export default function App() {
  const [general, setGeneral] = useState<General>({
    color: "#FFF",
    opacity: 1,
    strokeWidth: 3,
    dash: "solid",
    scale: 1,
    image: [],
    font: 20,
  });

  const [activeTool, setActiveTool] = useState<ActiveTool>("pointer");
  const [shape, setShape] = useState("");

  return (
    <>
      <Canvas
        activeTool={activeTool}
        general={general}
        setActiveTool={setActiveTool}
      />
      <Overlay
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        general={general}
        setGeneral={setGeneral}
        shape={shape}
        setShape={setShape}
      />
      <Disclaimer />
    </>
  );
}
