export default function Icon({
  children,
  className,
}: {
  children?: JSX.Element;
  className?: string;
}) {
  return (
    <>
      <div
        className={`shrink-0 size-[18px] flex justify-center items-center ${className}`}
      >
        {children}
      </div>
    </>
  );
}
