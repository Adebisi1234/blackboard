import "./App.css";
import Canvas from "./components/Canvas";
import Disclaimer from "./components/ui/Disclaimer";
import Overlay from "./components/ui/UiOverlay";

export default function App() {
  //  if (location.search.substring(4)) {
  // ProjectId = location.search.substring(4)
  // };

  return (
    <>
      <Canvas />
      <Overlay />
      <Disclaimer />
    </>
  );
}
