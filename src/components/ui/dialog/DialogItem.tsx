import { ContainerProp } from "../../../types/general";
import { cn } from "../../../utils/cn";

export default function DialogItem(prop: ContainerProp<HTMLDivElement>) {
  prop = {
    ...prop,
    className: cn(
      "flex justify-between items-center hover:bg-[#333438] p-0.5 rounded-sm",
      prop.className
    ),
  };
  return <div {...prop}>{prop.children}</div>;
}
