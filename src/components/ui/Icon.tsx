import { cn } from "../../utils/cn";

export interface IconProp extends React.HTMLAttributes<HTMLDivElement> {
  children?: JSX.Element;
  className?: string;
}

export default function Icon(prop: IconProp) {
  prop = {
    ...prop,
    className: cn(
      `shrink-0 size-[18px] flex justify-center items-center `,
      prop.className
    ),
  };
  return (
    <>
      <div {...prop}>{prop.children}</div>
    </>
  );
}
