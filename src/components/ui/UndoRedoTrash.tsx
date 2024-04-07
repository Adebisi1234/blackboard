import Button from "./Button";
import { DotVertical, Duplicate, Redo, Trash, Undo } from "./Svg";
import { useDrawing } from "../../store/Store";

export default function UndoRedoTrash() {
  const clearAll = useDrawing((state) => state.clearAll);
  return (
    <div className="flex items-center gap-1 relative">
      <Button>
        <Undo />
      </Button>
      <Button>
        <Redo />
      </Button>
      <Button>
        <Trash />
      </Button>
      <Button>
        <Duplicate />
      </Button>
      <Button
        className="bg-red-500"
        title="Reset Drawings"
        onPointerDown={() => {
          useDrawing.persist.clearStorage();
          clearAll();
        }}
      >
        <DotVertical />
      </Button>
    </div>
  );
}
