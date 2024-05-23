import { useDrawing } from "../../../store/Store";
import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";

export default function ZoomDialog() {
  const [scale, setScale] = useDrawing((s) => [s.scale, s.setScale]);
  return (
    <DialogContainer className="w-48" title="Mobile zoom">
      <DialogItem
        className={`${scale === 2 ? "cursor-not-allowed opacity-60" : ""}`}
        onClick={() => setScale(Math.min(2, scale + 0.25))}
      >
        <span>Zoom in</span>
        <kbd>Ctrl =</kbd>
      </DialogItem>
      <DialogItem
        className={`${scale === 2 ? "cursor-not-allowed opacity-60" : ""}`}
        onClick={() => setScale(Math.max(0.25, scale - 0.25))}
      >
        <span>Zoom out</span>
        <kbd>Ctrl -</kbd>
      </DialogItem>
      <DialogItem onClick={() => setScale(1)}>
        <span>Zoom to 100%</span>
        <kbd> Shift 0</kbd>
      </DialogItem>
      <DialogItem onClick={() => setScale(1)}>
        <span>Zoom to fit</span>
        <kbd>Shift 1</kbd>
      </DialogItem>
      <DialogItem>
        <span>Zoom to selection</span>
        <kbd>Shift 2</kbd>
      </DialogItem>
    </DialogContainer>
  );
}
