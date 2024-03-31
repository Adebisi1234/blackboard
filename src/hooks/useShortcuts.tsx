import { useCallback, useEffect, useState } from "react";
import { useActive, useDrawing } from "../store/Store";

export default function useShortcuts(drawingId: { current: number }) {
  const { drawing, hideComp, copyComp, pasteComp } = useDrawing();
  const { activeComp, setActiveComp } = useActive();
  const [copied, setCopied] = useState<number[]>([]);
  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      // console.log(ev.key, ev.ctrlKey);

      // Copy
      if (ev.ctrlKey && ev.key.toLowerCase() === "c") {
        setCopied(activeComp);
        copyComp(activeComp);
        return;
      }
      // paste
      if (ev.ctrlKey && ev.key.toLowerCase() === "v") {
        pasteComp();
        drawingId.current += copied.length;
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
    [activeComp, hideComp, pasteComp, copyComp]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeComp]);
}
