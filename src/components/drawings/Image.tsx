import { forwardRef, useEffect, useRef } from "react";
import { type Drawings } from "../../types/general";
import { useLocation } from "../../store/Store";

export default forwardRef<HTMLDivElement, Drawings<"image">[0]>(function Image(
  prop,
  activeCompRef
) {
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
      ref={activeCompRef}
      className={`size-fit `}
      draggable={false}
      id={`${prop.id}`}
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
        ref={imgRef}
      />
    </div>
  );
});
