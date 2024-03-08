import { useEffect } from "react";
import { useDrawing } from "../store/Store";

export default function useAddToActiveComp(
  highlighted: number[],
  activeCompRef: React.MutableRefObject<number[] | HTMLElement | null>
) {
  const { updateDrawing, drawing } = useDrawing();
  useEffect(() => {
    if (highlighted.length === 0) {
      if (!Array.isArray(activeCompRef.current)) return;
      activeCompRef.current.forEach((id) => {
        updateDrawing(id, { ...drawing[id], highlight: false });
      });
      activeCompRef.current = [];
      return;
    }
    activeCompRef.current = [];
    highlighted.forEach((id) => {
      (activeCompRef.current as number[]).push(id);
      if (!drawing[id]) return;
      updateDrawing(id, { ...drawing[id], highlight: true });
    });
  }, [highlighted]);
}
