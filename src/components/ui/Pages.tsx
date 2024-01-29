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
    <div className="flex items-center gap-1 bg-[#1f1e21]">
      <Button>
        <Menu />
      </Button>
      <Button className="w-fit gap-4 rounded-md p-1">
        <div className="w-fit h-full pr-4 flex justify-center items-center text-left">
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
    </div>
  );
}
