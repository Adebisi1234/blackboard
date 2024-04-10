import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";

export default function ZoomDialog() {
  return (
    <DialogContainer
      className="w-48 cursor-not-allowed"
      title="Not implemented yet"
    >
      <DialogItem>
        <span>Zoom in</span>
        <span>Ctrl =</span>
      </DialogItem>
      <DialogItem>
        <span>Zoom out</span>
        <span>Ctrl -</span>
      </DialogItem>
      <DialogItem>
        <span>Zoom to 100%</span>
        <span> Shift 0</span>
      </DialogItem>
      <DialogItem>
        <span>Zoom to fit</span>
        <span>Shift 1</span>
      </DialogItem>
      <DialogItem>
        <span>Zoom to selection</span>
        <span>Shift 2</span>
      </DialogItem>
    </DialogContainer>
  );
}
