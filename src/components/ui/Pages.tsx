import useWindowSize from "../../hooks/useWindowSize";
import { useOpenDialog } from "../../store/Store";
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
  const windowWidth = useWindowSize();
  const { dialog, setDialog } = useOpenDialog();
  return (
    <div className="flex items-center gap-1 bg-[#1f1e21] relative" id="pages">
      <Button onClick={() => setDialog("menu")}>
        <Menu />
      </Button>
      <dialog open={dialog === "menu"}></dialog>
      <Button className="rounded-md w-fit">
        <div
          className="flex items-center justify-center h-full gap-4 p-1 "
          onClick={() => setDialog("pages")}
        >
          <p className="pr-4 text-left w-fit">Page 1</p>

          <ChevronDown />
        </div>
        <dialog open={dialog === "pages"}></dialog>
      </Button>
      {windowWidth > 768 && (
        <>
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
        </>
      )}

      <BackToContent />
    </div>
  );
}
