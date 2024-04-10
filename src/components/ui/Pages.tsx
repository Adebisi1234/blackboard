import useWindowSize from "../../hooks/useWindowSize";
import { useDrawing, useOpenDialog } from "../../store/Store";
import BackToContent from "./BackToContent";
import Button from "./Button";
import MenuDialog from "./dialog/MenuDialog";
import PageDialog from "./dialog/PageDialog";
import {
  ChevronDown,
  DotVertical,
  Duplicate,
  Menu,
  Redo,
  Trash,
  Undo,
} from "./Svg";
import UndoRedoTrash from "./UndoRedoTrash";

export default function Pages() {
  const windowWidth = useWindowSize();
  const { dialog, setDialog, reset } = useOpenDialog();
  const page = useDrawing((s) => s.getPages()[0]);
  return (
    <div className="flex items-center gap-1 bg-[#1f1e21] relative" id="pages">
      <Button onClick={() => (dialog !== "menu" ? setDialog("menu") : reset())}>
        <Menu />
      </Button>
      <dialog open={dialog === "menu"} className="top-full m-0">
        <MenuDialog />
      </dialog>
      <Button className="rounded-md w-fit">
        <div
          className="flex items-center justify-center h-full gap-4 p-1 "
          onClick={() => (dialog !== "pages" ? setDialog("pages") : reset())}
        >
          <p className="pr-4 text-left w-fit">Page {page}</p>

          <ChevronDown />
        </div>
        <dialog open={dialog === "pages"} className="top-full m-0">
          <PageDialog />
        </dialog>
      </Button>
      {windowWidth >= 768 && <UndoRedoTrash />}

      <BackToContent />
    </div>
  );
}
