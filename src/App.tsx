import { useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import Disclaimer from "./components/ui/Disclaimer";
import Overlay from "./components/ui/UiOverlay";

import { ActiveTool, General } from "./types/general";

export default function App() {
  const [general, setGeneral] = useState<General>({
    color: "#ffffff",
    opacity: 1,
    strokeWidth: 3,
    dash: "solid",
    fill: "none",
    scale: 1,
    image: [],
    font: 24,
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
