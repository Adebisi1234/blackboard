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
  return (
    <div className="absolute flex gap-1 w-fit h-fit bottom-2 left-1/2 -translate-x-1/2 bg-[#232529] rounded-xl p-1">
      <Button className="rounded-lg hover:bg-[#2e3034] bg-blue-600">
        <Pointer />
      </Button>
      <Button className="rounded-lg hover:bg-[#2e3034]">
        <Hand />
      </Button>
      <Button className="rounded-lg hover:bg-[#2e3034]">
        <Pencil />
      </Button>
      <Button className="rounded-lg hover:bg-[#2e3034]">
        <Eraser />
      </Button>
      <Button className="rounded-lg hover:bg-[#2e3034]">
        <Arrow />
      </Button>
      <Button className="rounded-lg hover:bg-[#2e3034]">
        <Text />
      </Button>
      <Button className="rounded-lg hover:bg-[#2e3034]">
        <Note />
      </Button>
      <Button className="rounded-lg hover:bg-[#2e3034]">
        <ImageIcon />
      </Button>
      <Button className="rounded-lg hover:bg-[#2e3034]">
        <GeoRect />
      </Button>
      <Button className="rounded-lg hover:bg-[#2e3034]">
        <ChevronUp />
      </Button>
    </div>
  );
}
