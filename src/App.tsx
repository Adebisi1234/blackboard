import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Footer from "./components/Footer";
// import Header from "./components/Header";
import { type Tools } from "./types/ActiveTools";
function App() {
  const [tool, setTool] = useState<Tools>({
    toolName: "",
    toolElement: null!,
  });
  useEffect(() => {
    tool.toolElement?.classList.add("active");
  }, [tool]);

  return (
    <>
      <Board toolName={tool.toolName} shape={tool.shape} />
      <Footer setTool={setTool} tool={tool} />
    </>
  );
}

export default App;
