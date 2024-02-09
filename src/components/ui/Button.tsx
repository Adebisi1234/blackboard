export interface Prop extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | JSX.Element[];
  className?: string;
  id?: string;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  tool?: string;
}

export default function Button(prop: Prop) {
  prop = {
    ...prop,
    draggable: "false",
    className: `size-10 shrink-0 flex justify-center items-center cursor-pointer text-xs gap-0 relative hover:bg-[#333438] ${prop.className}`,
  };

  return (
    <>
      <button {...prop} data-tool={prop.tool} data-id={prop?.id}>
        {prop.children}
      </button>
    </>
  );
}
