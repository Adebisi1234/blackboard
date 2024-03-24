import { forwardRef, useEffect, useRef } from "react";
import { type Drawings } from "../../types/general";
import { useCanvas, useLocation } from "../../store/Store";
import CompOverlay from "../ui/CompOverlay";

export default function Image(prop: Drawings<"image">[0]) {
  const { src, alt, width, height } = prop.prop;
  const imgRef = useRef<HTMLImageElement>(null);
  const setLocation = useLocation((state) => state.setLocation);
  useEffect(() => {
    if (!imgRef.current) return;
    const { width, height, x, y } = imgRef.current
      ?.getBoundingClientRect()
      .toJSON();
    setLocation({
      x,
      y,
      width,
      height,
      id: prop.id,
    });
  }, [width, height, prop.pos]);
  return (
    <div
      className={`size-fit `}
      draggable={false}
      id={`${prop.id}`}
      style={{
        left: "50%",
        top: "50%",
        opacity: prop.opacity,
        width,
        height,
      }}
    >
      <img
        src={src}
        ref={imgRef}
        alt={alt}
        id={`${prop.id}`}
        className="object-contain -translate-x-1/2 -translate-y-1/2 size-full"
        draggable={false}
        style={{
          maxWidth: innerWidth / 2,
          maxHeight: innerHeight - 400,
          width,
          height,
        }}
      />
      {prop.highlight && prop.opacity !== 0 && (
        <CompOverlay id={prop.id} type={"image"} opacity={prop.opacity!} />
      )}
    </div>
  );
}
