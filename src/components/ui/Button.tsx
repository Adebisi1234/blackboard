import type { ContainerProp } from "../../types/general";
import { cn } from "../../utils/cn";

export default function Button(prop: ContainerProp) {
  prop = {
    ...prop,
    draggable: "false",
    className: cn(
      `size-10 shrink-0 flex justify-center items-center cursor-pointer text-xs gap-0 relative hover:bg-[#333438]`,
      prop.className
    ),
  };

  return (
    <>
      <button {...prop} data-tool={prop.tool} data-id={prop?.id}>
        {prop.children}
      </button>
    </>
  );
}
