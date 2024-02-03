import { ActiveTool } from "../../App";
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
};
export default function Controls({ activeTool, setActiveTool }: Prop) {
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
        className={`rounded-lg hover:bg-[#2e3034] ${
          activeTool === "image" && "bg-[#4387f4]"
        }`}
        tool="image"
        onClick={(e) => {
          e.currentTarget.getAttribute("data-tool");
          setActiveTool(
            (e.currentTarget.getAttribute("data-tool") as ActiveTool) ??
              activeTool
          );
        }}
      >
        <ImageIcon />
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
