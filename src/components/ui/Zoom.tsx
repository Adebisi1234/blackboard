import Button from "./Button";
import { ChevronNe } from "./Svg";

export default function Zoom() {
  return (
    <div className="flex justify-center items-center bg-[#1f1e21] px-1 ml-1 mb-1 rounded-lg">
      <Button className="rounded-md">
        <p>100%</p>
      </Button>
      <Button className="rounded-md">
        <ChevronNe />
      </Button>
    </div>
  );
}
