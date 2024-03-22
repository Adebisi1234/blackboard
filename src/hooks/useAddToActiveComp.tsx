import { useEffect } from "react";
import { useActive, useDrawing, useHighlighted } from "../store/Store";

export default function useAddToActiveComp() {
  const { updateDrawing, drawing } = useDrawing();
  const { setActiveComp, activeComp } = useActive();
  const highlighted = useHighlighted((state) => state.highlighted);
  useEffect(() => {
    if (highlighted.length === 0) {
      activeComp.forEach((id) => {
        if (!drawing[id]) return;
        updateDrawing(id, { ...drawing[id], highlight: false });
      });
      setActiveComp([]);
      return;
    }
    highlighted.forEach((id) => {
      if (!drawing[id]) return;
      updateDrawing(id, { ...drawing[id], highlight: true });
    });
    setActiveComp([...highlighted]);
  }, [highlighted]);
}
