import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Footer from "./components/Footer";
import { type Colors, type Tools } from "./types/ActiveTools";
function App() {
  const [color, setColor] = useState<Colors>("#fff");
  const [tool, setTool] = useState<Tools>({
    toolName: "",
    toolElement: null!,
  });
  const [title, setTitle] = useState(() => {
    return localStorage.getItem("title") ?? "";
  });

  useEffect(() => {
    tool.toolElement?.classList.add("active");
  }, [tool]);

  useEffect(() => {
    if (title === "") {
      document.title =
        "Blackboard | Beautiful Interactive board you can share with friends";
    } else {
      document.title = `Blackboard | ${title}`;
    }
    localStorage.setItem("title", title);
  }, [title]);
  return (
    <>
      <Board
        toolName={tool.toolName}
        shape={tool.shape}
        color={color}
        setTitle={setTitle}
      />
      <Footer
        setTool={setTool}
        tool={tool}
        setColor={setColor}
        color={color}
        title={title}
        setTitle={setTitle}
      />
    </>
  );
}

export default App;
