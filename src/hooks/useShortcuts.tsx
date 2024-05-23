import { useCallback, useEffect } from "react";
import { useActive, useDrawing } from "../store/Store";

export default function useShortcuts() {
  const { hideComp, copyComp, pasteComp, restoreComp, undo } = useDrawing();

  const { activeComp, setActiveComp } = useActive();
  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      // Copy
      if (ev.ctrlKey && ev.key.toLowerCase() === "c") {
        copyComp(activeComp);
        return;
      }
      if (ev.ctrlKey && ev.key.toLowerCase() === "x") {
        copyComp(activeComp, "cut");
        return;
      }
      // paste
      if (ev.ctrlKey && ev.key.toLowerCase() === "v") {
        pasteComp();
        // Set the new components as active
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
}
