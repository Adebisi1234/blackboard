import React from "react";

export type ImageProp = {
  src: string;
  type: "image";
  alt: string;
  pos: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  opacity: number;
  highlight?: boolean;
  id: number;
};
export default React.forwardRef<HTMLDivElement, ImageProp>(function Image(
  { src, alt, pos, width, height, opacity, highlight = false, id }: ImageProp,
  activeCompRef
) {
  return (
    <div
      ref={activeCompRef}
      className={`left-[${pos.x}px] top-[${pos.y}px] -translate-x-1/2 -translate-y-1/2 opacity-[${opacity}]`}
      id={`${id}`}
    >
      <img src={src} alt={alt} width={width} height={height} id={`${id}`} />
    </div>
  );
});
