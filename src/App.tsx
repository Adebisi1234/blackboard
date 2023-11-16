import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Tools } from "./context/ActiveTools";
function App() {
  const [tool, setTool] = useState<Tools>({
    toolName: "",
    toolElement: null!,
  });
  useEffect(() => {
    tool.toolElement?.classList.add("active");
  }, [tool]);
  console.log(tool);
  return (
    <>
      <Header toolName={tool.toolName} />
      <Board />
      <Footer setTool={setTool} tool={tool} />
    </>
  );
}

export default App;
