import useWindowSize from "../../hooks/useWindowSize";
import { useActiveTool, useImage, useOpenDialog } from "../../store/Store";
import Button from "./Button";
import ExtraControlsDialog from "./dialog/ExtraControlsDialog";
import Icon from "./Icon";
import Panel from "./Panel";
import {
  Arrow,
  ChevronUp,
  Eraser,
  Hand,
  ImageIcon,
  Note,
  Pencil,
  Pointer,
  Shapes,
  Text,
} from "./Svg";
import UndoRedoTrash from "./UndoRedoTrash";

export default function Controls() {
  const { activeTool, setActiveTool } = useActiveTool();
  const { dialog, setDialog, reset } = useOpenDialog();
  const [windowWidth] = useWindowSize();
  const setImage = useImage((state) => state.setImage);
  // const tools = [
  //   {
  //     title: "Tool - Grab",
  //     tool: "hand",

  //   }
  // ]TODO:  Make it easily extendable..
  return (
    <div
      className="absolute flex gap-1 w-fit h-fit bottom-2 left-1/2 -translate-x-1/2 bg-[#232529] rounded-xl p-1 z-50 max-w-fit"
      data-testid="controls"
    >
      {windowWidth < 768 && (
        <div className="absolute bottom-full left-0 rounded-lg bg-[#1f1e21]">
          <UndoRedoTrash />
        </div>
      )}
      <Button
        className={`rounded-lg  hover:bg-[#2e3034] ${
          activeTool === "pointer" && "bg-[#4387f4]"
        }`}
        tool="pointer"
        title="Tool - pointer"
        onClick={() => setActiveTool("pointer")}
      >
        <Pointer />
      </Button>
      <Button
        className={`rounded-lg  hover:bg-[#2e3034] ${
          activeTool === "hand" && "bg-[#4387f4]"
        }`}
        tool="hand"
        title="Tool - Grab"
        onClick={() => setActiveTool("hand")}
      >
        <Hand />
      </Button>
      <Button
        className={`rounded-lg  hover:bg-[#2e3034] ${
          activeTool === "pencil" && "bg-[#4387f4]"
        }`}
        tool="pencil"
        title="Tool - pencil"
        onClick={() => setActiveTool("pencil")}
      >
        <Pencil />
      </Button>
      <Button
        className={`rounded-lg  hover:bg-[#2e3034] ${
          activeTool === "eraser" && "bg-[#4387f4]"
        }`}
        tool="eraser"
        title="Tool - eraser"
        onClick={() => setActiveTool("eraser")}
      >
        <Eraser />
      </Button>
      <Button
        className={`rounded-lg  hover:bg-[#2e3034] ${
          activeTool === "arrow" && "bg-[#4387f4]"
        }`}
        tool="arrow"
        title="Tool - arrow"
        onClick={() => setActiveTool("arrow")}
      >
        <Arrow />
      </Button>
      <Button
        className={`rounded-lg  hover:bg-[#2e3034] ${
          activeTool === "text" && "bg-[#4387f4]"
        }`}
        tool="text"
        title="Tool - text"
        onClick={() => setActiveTool("text")}
      >
        <Text />
      </Button>
      {windowWidth >= 768 && (
        <>
          {/* Magic number*/}
          <Button
            className={`rounded-lg  hover:bg-[#2e3034] ${
              activeTool === "note" && "bg-[#4387f4]"
            }`}
            tool="note"
            title="Tool - note"
            onClick={() => setActiveTool("note")}
          >
            <Note />
          </Button>
          <Button
            className={`rounded-lg  relative hover:bg-[#2e3034] ${
              activeTool === "image" && "bg-[#4387f4]"
            }`}
            tool="pointer"
            title="Tool - image"
          >
            <label
              htmlFor="image"
              className="flex items-center justify-center cursor-pointer size-full"
            >
              <ImageIcon />
            </label>
            <input
              type="file"
              name="file"
              id="image"
              className="absolute inset-0 z-10 invisible size-full "
              tabIndex={-1}
              multiple={false}
              accept=".jpg,.png"
              onChange={(e) => {
                setActiveTool("pointer");
                if (!e.target.files || !e.target.files[0]) return;
                const img = document.createElement("img");
                const imageSrc = e.target.files[0];
                img.src = URL.createObjectURL(imageSrc);
                img.addEventListener("load", () => {
                  setImage({
                    id: imageSrc.lastModified,
                    src: img.src,
                    alt: "Image uploaded by user",
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                  });
                });
              }}
            />
          </Button>
          <Button
            className={`rounded-lg  hover:bg-[#2e3034] ${
              activeTool === "shape" && "bg-[#4387f4]"
            }`}
            tool="shape"
            title="Tool - shapes"
            onClick={() =>
              dialog !== "controls" ? setDialog("controls") : reset()
            }
          >
            <Shapes />
          </Button>
          <dialog open={dialog === "controls"} className="mr-0 bottom-full">
            <ExtraControlsDialog />
          </dialog>
        </>
      )}
      {windowWidth < 768 && (
        <>
          <Button
            className={`rounded-lg border-2 border-[#131315]  hover:bg-[#2e3034]`}
            onClick={() =>
              dialog !== "controls" ? setDialog("controls") : reset()
            }
          >
            <ChevronUp />
          </Button>
          <dialog open={dialog === "controls"} className="mr-0 bottom-full">
            <ExtraControlsDialog />
          </dialog>
          <Button
            className={`rounded-lg  hover:bg-[#2e3034] border border-[#131315]`}
            onClick={() => {
              dialog !== "panel" ? setDialog("panel") : reset();
            }}
          >
            <Icon className="bg-white rounded-full"></Icon>
          </Button>
        </>
      )}

      {/* <dialog open={dialog === "controls"}></dialog> */}
      {windowWidth < 768 && (
        <dialog open={dialog === "panel"} className="mr-0 bottom-full">
          <Panel />
        </dialog>
      )}
    </div>
  );
}
