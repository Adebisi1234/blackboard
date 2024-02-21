import { ActiveTool, General } from "../../types/general";
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
type Prop = {
  activeTool: ActiveTool;
  setActiveTool: React.Dispatch<React.SetStateAction<ActiveTool>>;
  setGeneral: React.Dispatch<React.SetStateAction<General>>;
};
export default function Controls({
  activeTool,
  setActiveTool,
  setGeneral,
}: Prop) {
  return (
    <div className="absolute flex gap-1 w-fit h-fit bottom-2 left-1/2 -translate-x-1/2 bg-[#232529] rounded-xl p-1">
      <Button
        className={`rounded-lg hover:bg-[#2e3034] ${
          activeTool === "pointer" && "bg-[#4387f4]"
        }`}
        tool="pointer"
        onClick={(e) => {
          e.currentTarget.getAttribute("data-tool");
          setActiveTool(
            (e.currentTarget.getAttribute("data-tool") as ActiveTool) ??
              activeTool
          );
        }}
      >
        <Pointer />
      </Button>
      <Button
        className={`rounded-lg hover:bg-[#2e3034] ${
          activeTool === "hand" && "bg-[#4387f4]"
        }`}
        tool="hand"
        onClick={(e) => {
          e.currentTarget.getAttribute("data-tool");
          setActiveTool(
            (e.currentTarget.getAttribute("data-tool") as ActiveTool) ??
              activeTool
          );
        }}
      >
        <Hand />
      </Button>
      <Button
        className={`rounded-lg hover:bg-[#2e3034] ${
          activeTool === "pencil" && "bg-[#4387f4]"
        }`}
        tool="pencil"
        onClick={(e) => {
          e.currentTarget.getAttribute("data-tool");
          setActiveTool(
            (e.currentTarget.getAttribute("data-tool") as ActiveTool) ??
              activeTool
          );
        }}
      >
        <Pencil />
      </Button>
      <Button
        className={`rounded-lg hover:bg-[#2e3034] ${
          activeTool === "eraser" && "bg-[#4387f4]"
        }`}
        tool="eraser"
        onClick={(e) => {
          e.currentTarget.getAttribute("data-tool");
          setActiveTool(
            (e.currentTarget.getAttribute("data-tool") as ActiveTool) ??
              activeTool
          );
        }}
      >
        <Eraser />
      </Button>
      <Button
        className={`rounded-lg hover:bg-[#2e3034] ${
          activeTool === "arrow" && "bg-[#4387f4]"
        }`}
        tool="arrow"
        onClick={(e) => {
          e.currentTarget.getAttribute("data-tool");
          setActiveTool(
            (e.currentTarget.getAttribute("data-tool") as ActiveTool) ??
              activeTool
          );
        }}
      >
        <Arrow />
      </Button>
      <Button
        className={`rounded-lg hover:bg-[#2e3034] ${
          activeTool === "text" && "bg-[#4387f4]"
        }`}
        tool="text"
        onClick={(e) => {
          e.currentTarget.getAttribute("data-tool");
          setActiveTool(
            (e.currentTarget.getAttribute("data-tool") as ActiveTool) ??
              activeTool
          );
        }}
      >
        <Text />
      </Button>
      <Button
        className={`rounded-lg hover:bg-[#2e3034] ${
          activeTool === "note" && "bg-[#4387f4]"
        }`}
        tool="note"
        onClick={(e) => {
          e.currentTarget.getAttribute("data-tool");
          setActiveTool(
            (e.currentTarget.getAttribute("data-tool") as ActiveTool) ??
              activeTool
          );
        }}
      >
        <Note />
      </Button>
      <Button
        className={`rounded-lg relative hover:bg-[#2e3034] ${
          activeTool === "image" && "bg-[#4387f4]"
        }`}
        tool="pointer"
        onClick={(e) => {
          e.currentTarget.getAttribute("data-tool");
          setActiveTool(
            (e.currentTarget.getAttribute("data-tool") as ActiveTool) ??
              activeTool
          );
        }}
      >
        <label htmlFor="image">
          <ImageIcon />
        </label>
        <input
          type="file"
          name="file"
          id="image"
          className="absolute size-full inset-0 z-1 invisible"
          tabIndex={-1}
          multiple={false}
          accept=".jpg,.png"
          onChange={(e) => {
            if (!e.target.files) return;
            const img = document.createElement("img");
            img.src = URL.createObjectURL(e.target.files[0]);
            const imageSrc = e.target.files[0];
            img.addEventListener("load", () => {
              console.log(img.naturalHeight, innerHeight);
              console.log(img.naturalWidth, innerWidth);
              setGeneral((prev) => {
                return {
                  ...prev,
                  image: [
                    ...prev.image,
                    {
                      id: imageSrc.lastModified,
                      src: img.src,
                      alt: "Image uploaded by user",
                      width: img.naturalWidth,
                      height: img.naturalHeight,
                    },
                  ],
                };
              });
            });
          }}
        />
      </Button>
      <Button
        className={`rounded-lg hover:bg-[#2e3034] ${
          activeTool === "shape" && "bg-[#4387f4]"
        }`}
        tool="shape"
        onClick={(e) => {
          e.currentTarget.getAttribute("data-tool");
          setActiveTool(
            (e.currentTarget.getAttribute("data-tool") as ActiveTool) ??
              activeTool
          );
        }}
      >
        <GeoRect />
      </Button>
      <Button className={`rounded-lg hover:bg-[#2e3034]`}>
        <ChevronUp />
      </Button>
    </div>
  );
}
