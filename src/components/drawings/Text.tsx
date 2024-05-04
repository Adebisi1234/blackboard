import { useEffect, useRef } from "react";
import { Drawings } from "../../types/general";
import { useDrawing, useLocation } from "../../store/Store";
import CompOverlay from "../ui/CompOverlay";
import useWindowSize from "../../hooks/useWindowSize";

export default function Text(prop: Drawings<"text">[0]) {
  const textRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const setLocation = useLocation((state) => state.setLocation);
  const updateDrawing = useDrawing((s) => s.updateDrawing);
  const [windowWidth, windowHeight] = useWindowSize();
  useEffect(() => {
    if (!textRef.current) return;
    const { width, height, x, y } = textRef.current.getBoundingClientRect();
    setLocation({
      width: Math.max(width, 4),
      height: Math.max(height, 16),
      x,
      y,
      id: prop.id,
    });
  }, [
    textRef.current?.offsetWidth,
    textRef.current?.offsetHeight,
    windowWidth,
    windowHeight,
    prop.pos,
  ]);
  return (
    <>
      <div
        ref={containerRef}
        id={`${prop.id}`}
        data-testid={prop.id}
        className={`z-${prop.id} ${prop.hovered && "border-green-500"}`}
        style={{
          left: `${prop.pos.x}px`,
          top: `${prop.pos.y}px`,
          backgroundColor: `transparent`,
          color: prop.color,
          opacity: prop.opacity,
          fontSize: prop.font,
          width: textRef.current?.offsetWidth,
          height: textRef.current?.offsetHeight,
        }}
        onPointerDown={(e) => (e.bubbled = true)}
      >
        <input
          name={`${prop.id}`}
          id={`${prop.id}`}
          ref={textRef}
          width={4}
          height={prop.font}
          className="bg-transparent outline-none size-fit"
          onChange={(e) =>
            (e.currentTarget.style.width = `${e.currentTarget.scrollWidth}px`)
          }
          onPointerLeave={(e) => {
            if (!textRef.current) return;
            let edit = {
              ...prop,
              prop: { ...prop.prop, value: e.currentTarget.value },
            };
            updateDrawing(prop.id, edit);
          }}
          defaultValue={prop.prop.value}
          placeholder="Enter your text"
        ></input>
      </div>
      {prop.highlight && prop.opacity !== 0 && (
        <CompOverlay id={prop.id} opacity={prop.opacity} type={"text"} />
      )}
    </>
  );
}
