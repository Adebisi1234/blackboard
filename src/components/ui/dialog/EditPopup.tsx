import { useState } from "react";
import { useActive, useDrawing, useHighlighted } from "../../../store/Store";
import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";

export default function EditPopup() {
  const activeComp = useActive((s) => s.activeComp);
  const setHighlighted = useHighlighted((s) => s.setHighlighted); // Seems this have taking over
  const [copied, setCopied] = useState<number>(0);
  const {
    hideComp,
    copyComp,
    pasteComp,
    restoreComp,
    undo,
    drawing,
    clearAll,
  } = useDrawing((s) => ({
    hideComp: s.hideComp,
    copyComp: s.copyComp,
    pasteComp: s.pasteComp,
    restoreComp: s.restoreComp,
    undo: s.undo,
    drawing: s.getDrawing(),
    clearAll: s.clearAll,
  }));

  return (
    <DialogContainer className="w-[150px] max-h-fit">
      <DialogItem
        className={`justify-between items-end ${
          drawing.length === 0 ? "opacity-50" : ""
        }`}
        onPointerDown={() => undo()}
        title="Remove last component(s)"
      >
        <p>Undo</p>
        <kbd>Ctrl z</kbd>
      </DialogItem>
      <DialogItem
        className="justify-between items-end"
        onPointerDown={() => restoreComp()}
        title="Restore removed component(s)"
      >
        <p>Redo</p>
        {/* <span>Ctrl y</span> */}
        <kbd>Ctrl y</kbd>
      </DialogItem>
      <hr />
      <DialogItem
        className="justify-between items-end"
        onPointerDown={() => {
          // Copy then paste, I hope this works
          copyComp([...activeComp]);
          setCopied(activeComp.length);
        }}
      >
        <p>Copy</p>
        <kbd>Ctrl c</kbd>
      </DialogItem>
      <DialogItem
        className="justify-between items-end"
        onPointerDown={() => {
          pasteComp();
          // Set the new components as active
          if (typeof copied === "number") {
            let newActiveComp = [];
            for (let i = drawing.length; i <= drawing.length + copied; i++) {
              newActiveComp.push(i);
            }
            setHighlighted(newActiveComp);
          }
        }}
      >
        <p>Paste</p>
        <kbd>Ctrl v</kbd>
      </DialogItem>
      <DialogItem
        className="justify-between items-end"
        onPointerDown={() => {
          // Copy then paste, I hope this works
          copyComp([...activeComp]);
          setCopied(activeComp.length);
          pasteComp();
          // Set the new components as active
          if (typeof copied === "number") {
            let newActiveComp = [];
            for (let i = drawing.length; i <= drawing.length + copied; i++) {
              newActiveComp.push(i);
            }
            setHighlighted(newActiveComp);
          }
        }}
      >
        <p>Duplicate</p>
        <kbd>Ctrl D</kbd>
      </DialogItem>
      <DialogItem
        className="justify-between items-end"
        onPointerDown={() => {
          activeComp.forEach((id) => {
            hideComp(id);
          });
          setHighlighted([]);
        }}
      >
        <p>Delete</p>
      </DialogItem>
      <hr />
      <DialogItem
        className="justify-between items-end bg-red-500"
        onPointerDown={() => {
          useDrawing.persist.clearStorage();
          clearAll();
        }}
      >
        <p>Reset All</p>
      </DialogItem>
    </DialogContainer>
  );
}
