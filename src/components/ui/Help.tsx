import Button from "./Button";
import { QuestionMark } from "./Svg";

export default function Help() {
  return (
    <Button className="rounded-full bg-[#1f1e21] p-2 mb-1 size-10">
      <QuestionMark />
    </Button>
  );
}
