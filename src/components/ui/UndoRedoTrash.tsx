import Button from "./Button";
import { Duplicate, Redo, Reset, Trash, Undo } from "./Svg";
import { useActive, useDrawing } from "../../store/Store";
import { useState } from "react";

export default function UndoRedoTrash() {
  const clearAll = useDrawing((state) => state.clearAll);
  const { activeComp, setActiveComp } = useActive();
  const [copied, setCopied] = useState<number>(0);
  const { hideComp, copyComp, pasteComp, restoreComp, undo, getDrawing } =
    useDrawing();
  const drawing = getDrawing();
  return (
    <div className="flex items-center gap-1 relative">
      <Button
        className={`${drawing.length === 0 ? "opacity-50" : ""}`}
        onPointerDown={() => undo()}
      >
        <Undo />
      </Button>
      <Button onPointerDown={() => restoreComp()}>
        <Redo />
      </Button>
      <Button
        className={`${activeComp.length === 0 ? "opacity-50" : ""}`}
        onPointerDown={() => {
          activeComp.forEach((id) => {
            hideComp(id);
          });
          setActiveComp([]);
        }}
      >
        <Trash />
      </Button>
      <Button
        className={`${activeComp.length === 0 ? "opacity-50" : ""}`}
        onPointerDown={() => {
          // Copy then paste, I hope this works
          copyComp(activeComp);
          setCopied(activeComp.length);
          pasteComp();
          // Set the new components as active
          if (typeof copied === "number") {
            let newActiveComp = [];
            for (let i = drawing.length; i <= drawing.length + copied; i++) {
              newActiveComp.push(i);
            }
            setActiveComp(newActiveComp);
          }
        }}
      >
        <Duplicate />
      </Button>
      <Button
        className="bg-red-500"
        title="Reset Drawings"
        onPointerDown={() => {
          useDrawing.persist.clearStorage();
          clearAll();
        }}
      >
        <Reset />
      </Button>
    </div>
  );
}
