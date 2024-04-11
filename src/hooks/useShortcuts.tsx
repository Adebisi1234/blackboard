import { useCallback, useEffect, useState } from "react";
import { useActive, useDrawing } from "../store/Store";

export default function useShortcuts() {
  const { hideComp, copyComp, pasteComp, restoreComp, undo, getDrawing } =
    useDrawing();
  const drawing = getDrawing();
  const { activeComp, setActiveComp } = useActive();
  const [copied, setCopied] = useState<number>(0);
  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      // Copy
      if (ev.ctrlKey && ev.key.toLowerCase() === "c") {
        copyComp(activeComp);
        setCopied(activeComp.length);
        return;
      }
      if (ev.ctrlKey && ev.key.toLowerCase() === "x") {
        copyComp(activeComp, "cut");
        setCopied(activeComp.length);
        return;
      }
      // paste
      if (ev.ctrlKey && ev.key.toLowerCase() === "v") {
        pasteComp();
        // Set the new components as active
        if (typeof copied === "number") {
          let newActiveComp = [];
          for (let i = drawing.length; i <= drawing.length + copied; i++) {
            newActiveComp.push(i);
          }
          setActiveComp(newActiveComp);
        }
        return;
      }
      // undo
      if (ev.ctrlKey && ev.key.toLowerCase() === "z") {
        undo();
        return;
      }
      // Redo
      if (ev.ctrlKey && ev.key.toLowerCase() === "y") {
        restoreComp();
        return;
      }

      // Delete
      if (ev.key === "Delete") {
        activeComp.forEach((id) => {
          hideComp(id);
        });
        setActiveComp([]);
        return;
      }
      // change activeTool
      // Undo
      // Redo
    },
    [activeComp, hideComp, pasteComp, copyComp, restoreComp, undo]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeComp]);
  return handleKeyDown; //For the pages component
}
