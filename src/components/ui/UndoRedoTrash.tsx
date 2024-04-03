import Button from "./Button";
import { DotVertical, Duplicate, Redo, Trash, Undo } from "./Svg";

export default function UndoRedoTrash() {
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
      <Button>
        <DotVertical />
      </Button>
    </div>
  );
}
