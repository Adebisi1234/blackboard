import { useCallback, useEffect, useState } from "react";
import { useActive, useDrawing } from "../store/Store";

export default function useShortcuts() {
  const { hideComp, copyComp, pasteComp } = useDrawing();
  const { activeComp, setActiveComp } = useActive();
  const [copied, setCopied] = useState<number>(0);
  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      // console.log(ev.key, ev.ctrlKey);

      // Copy
      if (ev.ctrlKey && ev.key.toLowerCase() === "c") {
        setCopied(activeComp.length);
        copyComp(activeComp);
        return;
      }
      // paste
      if (ev.ctrlKey && ev.key.toLowerCase() === "v") {
        pasteComp();
        // Set the new components as active
        if (typeof copied === "number") {
          let newActiveComp = [];
          for (let i = 0; i <= copied; i++) {
            newActiveComp.push(i);
          }
          setActiveComp(newActiveComp);
        }
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
  return handleKeyDown; //For the pages component
}
