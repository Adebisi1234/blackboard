import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Footer from "./components/Footer";
// import Header from "./components/Header";
import { type Colors, type Tools } from "./types/ActiveTools";
function App() {
  const [color, setColor] = useState<Colors>("#fff");
  const [tool, setTool] = useState<Tools>({
    toolName: "",
    toolElement: null!,
  });
  useEffect(() => {
    tool.toolElement?.classList.add("active");
  }, [tool]);

  return (
    <>
      <Board toolName={tool.toolName} shape={tool.shape} color={color} />
      <Footer setTool={setTool} tool={tool} setColor={setColor} color={color} />
    </>
  );
}

export default App;
