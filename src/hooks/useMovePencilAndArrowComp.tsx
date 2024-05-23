import { produce } from "immer";
import { useDrawing } from "../store/Store";
import { Drawings } from "../types/general";

export default function useMovePencilAndArrowComp() {
  const updateDrawing = useDrawing((s) => s.updateDrawing);

  const movePencilOrArrow = (
    prop: Drawings[0],
    e: { movementX: number; movementY: number }
  ) => {
    const edit = produce(prop, (draft) => {
      if (draft.prop.type === "pencil") {
        if (draft.pos.x && draft.pos.y) {
          draft.pos.x += e.movementX;
          draft.pos.y += e.movementY;
        } else {
          draft.pos.x = e.movementX;
          draft.pos.y = e.movementY;
        }
      } else if (draft.prop.type === "arrow") {
        if (draft.prop.qCurve) {
          draft.prop.qCurve.x += e.movementX;
          draft.prop.qCurve.y += e.movementY;
        }
        draft.prop.startPos.x += e.movementX;
        draft.prop.startPos.y += e.movementY;
        draft.prop.endPos.x += e.movementX;
        draft.prop.endPos.y += e.movementY;
      }
    });
    updateDrawing(prop.id, edit);
  };

  return movePencilOrArrow;
}
