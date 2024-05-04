import Button from "./Button";
import { Duplicate, Redo, Reset, Trash, Undo } from "./Svg";
import { useActive, useDrawing } from "../../store/Store";
import { useState } from "react";

export default function UndoRedoTrash() {
  const clearAll = useDrawing((state) => state.clearAll);
  const { activeComp, setActiveComp } = useActive();
  const { hideComp, copyComp, pasteComp, restoreComp, undo } = useDrawing();
  return (
    <div className="relative flex items-center gap-1">
      <Button
        // className={`${drawing.length === 0 ? "opacity-50" : ""}`}
        onPointerDown={() => {
          undo();
        }}
        title="Remove last component(s)"
      >
        <Undo />
      </Button>
      <Button
        onPointerDown={() => restoreComp()}
        title="Restore removed component(s)"
      >
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
        title="Remove selected component(s)"
      >
        <Trash />
      </Button>
      <Button
        title="Duplicate"
        className={`${activeComp.length === 0 ? "opacity-50" : ""}`}
        onPointerDown={() => {
          // Copy then paste, I hope this works
          copyComp(activeComp);
          pasteComp();
        }}
      >
        <Duplicate />
      </Button>
      <Button
        className="bg-red-500"
        title="Reset Everything"
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
