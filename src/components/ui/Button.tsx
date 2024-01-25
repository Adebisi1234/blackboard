export default function Button({
  className,
  children,
  title,
  id,
}: {
  children: JSX.Element | JSX.Element[];
  className?: string;
  id?: string;
  title?: string;
}) {
  return (
    <>
      <button
        draggable="false"
        className={` size-10 shrink-0 flex justify-center items-center cursor-pointer text-xs gap-0 relative hover:bg-[#333438] ${className}`}
        title={`${title}`}
        data-id={id}
      >
        {children}
      </button>
    </>
  );
}
