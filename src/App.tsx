import { useRef, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import Disclaimer from "./components/ui/Disclaimer";
import Overlay from "./components/ui/UiOverlay";

export type Paths = {};
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

export default function App() {
  // const [paths, setPaths] = useState([]);
  // const [deletedPaths, setDeletedPaths] = useState([]);
  // const [postiton, setPostiton] = useState([]);
  const [activeTool, setActiveTool] = useState<ActiveTool>("pointer");
  // const [isToolActive, setIsToolActive] = useState({});
  // const pathId = useRef(0);
  // const [activeEl, setActiveEl] = useState<HTMLElement>(null!);
  console.log(activeTool);
  return (
    <>
      <Canvas />
      <Overlay activeTool={activeTool} setActiveTool={setActiveTool} />
      <Disclaimer />
      {/* 
      Ui-overlay
       - Header (page, user, share)
       - Options
       - Footer (zoom, controls, help)
    */}
      {/* Canvas absolute */}
    </>
  );
}
