import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";

export default function EditPopup() {
  return (
    <DialogContainer className="w-[150px] max-h-fit">
      <DialogItem className="justify-between items-end">
        <p>Undo</p>
        <kbd>Ctrl z</kbd>
      </DialogItem>
      <DialogItem className="justify-between items-end">
        <p>Redo</p>
        {/* <span>Ctrl y</span> */}
        <kbd>Ctrl y</kbd>
      </DialogItem>
      <hr />
      <DialogItem className="justify-between items-end">
        <p>Copy</p>
        <kbd>Ctrl c</kbd>
      </DialogItem>
      <DialogItem className="justify-between items-end">
        <p>Paste</p>
        <kbd>Ctrl v</kbd>
      </DialogItem>
      <DialogItem className="justify-between items-end">
        <p>Duplicate</p>
        <kbd>Ctrl D</kbd>
      </DialogItem>
      <DialogItem className="justify-between items-end">
        <p>Delete</p>
      </DialogItem>
      <hr />
      <DialogItem className="justify-between items-end bg-red-500">
        <p>Reset All</p>
      </DialogItem>
    </DialogContainer>
  );
}
