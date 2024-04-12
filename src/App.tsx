import "./App.css";
import Canvas from "./components/Canvas";
import Alerts from "./components/ui/Alerts";
import Overlay from "./components/ui/UiOverlay";

export default function App() {
  return (
    <>
      <Canvas />
      <Overlay />
      <Alerts />
    </>
  );
}
