import { forwardRef, useEffect, useRef } from "react";
import { type Drawings } from "../../types/general";
import { useCanvas, useLocation } from "../../store/Store";
import CompOverlay from "../ui/CompOverlay";

export default function Image(prop: Drawings<"image">[0]) {
  const { src, alt, width, height } = prop.prop;
  const imgRef = useRef<HTMLDivElement>(null);
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
      ref={imgRef}
      style={{
        left: prop.pos.x,
        top: prop.pos.y,
        opacity: prop.opacity,
        maxWidth: innerWidth / 2,
        maxHeight: innerHeight - 50,
        width,
        height,
      }}
    >
      <img
        src={src}
        alt={alt}
        id={`${prop.id}`}
        className="object-contain size-full"
        draggable={false}
      />
      {prop.highlight && prop.opacity !== 0 && (
        <CompOverlay id={prop.id} type={"image"} opacity={prop.opacity!} />
      )}
    </div>
  );
}
