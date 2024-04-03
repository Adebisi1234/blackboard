import type { ContainerProp } from "../../../types/general";
import { cn } from "../../../utils/cn";

export default function DialogContainer(prop: ContainerProp<HTMLDivElement>) {
  prop = {
    ...prop,
    className: cn(
      "flex flex-col gap-3 rounded-xl m-1 p-2 w-[220px] bg-[#232529]",
      prop.className
    ),
  };
  return <div {...prop}>{prop.children}</div>;
}
