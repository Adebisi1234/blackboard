import { useEffect } from "react";
import { useDrawing, useGeneral } from "../store/Store";

export default function useUpdateGeneral(
  activeCompRef: React.MutableRefObject<number[] | HTMLElement | null>
) {
  const { drawing, updateDrawing } = useDrawing();
  const general = useGeneral((state) => state.general);
  useEffect(() => {
    if (!activeCompRef.current) return;
    if (Array.isArray(activeCompRef.current)) {
      (activeCompRef.current as number[]).forEach((id) => {
        if (!drawing[id]) return;
        updateDrawing(id, {
          ...drawing[id],
          color: general.color,
          dash: general.dash,
          opacity: general.opacity,
          strokeWidth: general.strokeWidth,
        });
      });
      return;
    }
    const id = +(activeCompRef.current as HTMLElement).id;
    if (!drawing[id]) return;
    const update = {
      ...drawing[id],
      color: general.color,
      dash: general.dash,
      opacity: general.opacity,
      strokeWidth: general.strokeWidth,
    };
    if (update.prop.type === "note" || update.prop.type === "text") {
      update.font = general.font;
    }
    updateDrawing(id, update);
  }, [
    general.color,
    general.dash,
    general.opacity,
    general.scale,
    general.strokeWidth,
    general.font,
  ]);
}
