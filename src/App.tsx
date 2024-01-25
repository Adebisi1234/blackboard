import "./App.css";
import Canvas from "./components/Canvas";
import Disclaimer from "./components/ui/Disclaimer";
import Overlay from "./components/ui/UiOverlay";
export default function App() {
  return (
    <>
      <Canvas />
      <Overlay />
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
