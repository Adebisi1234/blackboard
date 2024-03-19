import { useEffect } from "react";
import { useActive, useDrawing, useGeneral } from "../store/Store";

export default function useUpdateGeneral() {
  const { drawing, updateDrawing } = useDrawing();
  const general = useGeneral((state) => state.general);
  const activeComp = useActive((state) => state.activeComp);
  useEffect(() => {
    if (!activeComp) return;
    const { highlight, hovered, ...update } = general; //Don't reset the highlighted on update
    activeComp.forEach((id) => {
      if (!drawing[id]) return;
      updateDrawing(id, {
        ...drawing[id],
        ...update,
      });
    });
  }, [general]);
}
