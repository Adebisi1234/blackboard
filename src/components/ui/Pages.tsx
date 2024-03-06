import { useCanvas } from "../../store/Store";
import BackToContent from "./BackToContent";
import Button from "./Button";
import {
  ChevronDown,
  DotVertical,
  Duplicate,
  Menu,
  Redo,
  Trash,
  Undo,
} from "./Svg";

export default function Pages() {
  return (
    <div className="flex items-center gap-1 bg-[#1f1e21] relative" id="pages">
      <Button>
        <Menu />
      </Button>
      <Button className="gap-4 p-1 rounded-md w-fit">
        <div className="flex items-center justify-center h-full pr-4 text-left w-fit">
          Page 1
        </div>
        <ChevronDown />
      </Button>
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

      <BackToContent />
    </div>
  );
}
