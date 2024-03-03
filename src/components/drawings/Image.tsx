import { forwardRef } from "react";
import { type Drawings } from "../../types/general";

export default forwardRef<HTMLDivElement, Drawings<"image">[0]>(function Image(
  prop,
  activeCompRef
) {
  const { src, alt, width, height } = prop.prop;

  return (
    <div
      ref={activeCompRef}
      className={`left-[${prop.pos.x}px] top-[${prop.pos.y}px] -translate-x-1/2 -translate-y-1/2 opacity-[${prop.opacity}]`}
      id={`${prop.id}`}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        id={`${prop.id}`}
      />
    </div>
  );
});
