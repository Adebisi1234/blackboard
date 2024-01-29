type Prop = {
  children: JSX.Element | JSX.Element[];
  className?: string;
  id?: string;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  tool?: string;
};
export default function Button({
  className,
  children,
  title,
  id,
  onClick,
  tool,
}: Prop) {
  const prop: { [key: string]: any } = {
    draggable: "false",
    className: `size-10 shrink-0 flex justify-center items-center cursor-pointer text-xs gap-0 relative hover:bg-[#333438] ${className}`,
  };
  if (title) {
    prop.title = title;
  }
  if (onClick) {
    prop.onClick = onClick;
  }
  if (tool) {
    prop.tool = tool;
  }
  return (
    <>
      <button {...prop} data-tool={tool} data-id={id}>
        {children}
      </button>
    </>
  );
}
