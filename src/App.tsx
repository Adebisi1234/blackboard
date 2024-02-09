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

type Color =
  | "#ffffff"
  | "#9398b0"
  | "#e599f7"
  | "#ae3ec9"
  | "#4263eb"
  | "#4dabf7"
  | "#ffc034"
  | "#f76707"
  | "#099268"
  | "#40c057"
  | "#ff8787"
  | "#e03131";

export type General = {
  color: Color;
  opacity: number;
  strokeWidth: number;
  fill: "none" | "semi" | "solid" | "pattern";
  dash: "draw" | "solid" | "dashed" | "dotted";
  scale: number;
  font: 12 | 16 | 20 | 24;
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
    color: "#ffffff",
    opacity: 1,
    strokeWidth: 3,
    dash: "solid",
    fill: "none",
    scale: 1,
    image: [],
    font: 20,
  });

  const [activeTool, setActiveTool] = useState<ActiveTool>("pointer"); //Probably turn this into a context
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
