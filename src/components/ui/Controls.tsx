import { useActiveTool, useDrawing, useImage } from "../../store/Store";
import { Drawings } from "../../types/general";
import Button from "./Button";
import {
  Arrow,
  ChevronUp,
  Eraser,
  GeoRect,
  Hand,
  ImageIcon,
  Note,
  Pencil,
  Pointer,
  Text,
} from "./Svg";

export default function Controls() {
  const setImage = useImage((state) => state.setImage);
  const { activeTool, setActiveTool } = useActiveTool();
  return (
    <div className="absolute flex gap-1 w-fit h-fit bottom-2 left-1/2 -translate-x-1/2 bg-[#232529] rounded-xl p-1 z-50 max-w-[90%]">
      <Button
        className={`rounded-lg shrink hover:bg-[#2e3034] ${
          activeTool === "pointer" && "bg-[#4387f4]"
        }`}
        tool="pointer"
        title="Tool - pointer"
        onClick={() => setActiveTool("pointer")}
      >
        <Pointer />
      </Button>
      <Button
        className={`rounded-lg shrink hover:bg-[#2e3034] ${
          activeTool === "hand" && "bg-[#4387f4]"
        }`}
        tool="hand"
        title="Tool - Grab"
        onClick={() => setActiveTool("hand")}
      >
        <Hand />
      </Button>
      <Button
        className={`rounded-lg shrink hover:bg-[#2e3034] ${
          activeTool === "pencil" && "bg-[#4387f4]"
        }`}
        tool="pencil"
        title="Tool - pencil"
        onClick={() => setActiveTool("pencil")}
      >
        <Pencil />
      </Button>
      <Button
        className={`rounded-lg shrink hover:bg-[#2e3034] ${
          activeTool === "eraser" && "bg-[#4387f4]"
        }`}
        tool="eraser"
        title="Tool - eraser"
        onClick={() => setActiveTool("eraser")}
      >
        <Eraser />
      </Button>
      <Button
        className={`rounded-lg shrink hover:bg-[#2e3034] ${
          activeTool === "arrow" && "bg-[#4387f4]"
        }`}
        tool="arrow"
        title="Tool - arrow"
        onClick={() => setActiveTool("arrow")}
      >
        <Arrow />
      </Button>
      <Button
        className={`rounded-lg shrink hover:bg-[#2e3034] ${
          activeTool === "text" && "bg-[#4387f4]"
        }`}
        tool="text"
        title="Tool - text"
        onClick={() => setActiveTool("text")}
      >
        <Text />
      </Button>
      <Button
        className={`rounded-lg shrink hover:bg-[#2e3034] ${
          activeTool === "note" && "bg-[#4387f4]"
        }`}
        tool="note"
        title="Tool - note"
        onClick={() => setActiveTool("note")}
      >
        <Note />
      </Button>
      <Button
        className={`rounded-lg shrink relative hover:bg-[#2e3034] ${
          activeTool === "image" && "bg-[#4387f4]"
        }`}
        tool="pointer"
        title="Tool - image"
      >
        <label
          htmlFor="image"
          className="size-full flex justify-center items-center cursor-pointer"
        >
          <ImageIcon />
        </label>
        <input
          type="file"
          name="file"
          id="image"
          className="absolute inset-0 invisible size-full z-10 "
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
        className={`rounded-lg shrink hover:bg-[#2e3034] ${
          activeTool === "shape" && "bg-[#4387f4]"
        }`}
        tool="shape"
        title="Tool - shape"
        onClick={() => setActiveTool("shape")}
      >
        <GeoRect />
      </Button>
      <Button className={`rounded-lg shrink hover:bg-[#2e3034]`}>
        <ChevronUp />
      </Button>
    </div>
  );
}
