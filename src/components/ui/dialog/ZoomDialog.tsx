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
        <kbd>Ctrl =</kbd>
      </DialogItem>
      <DialogItem>
        <span>Zoom out</span>
        <kbd>Ctrl -</kbd>
      </DialogItem>
      <DialogItem>
        <span>Zoom to 100%</span>
        <kbd> Shift 0</kbd>
      </DialogItem>
      <DialogItem>
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
