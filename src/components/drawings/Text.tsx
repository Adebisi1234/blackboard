import { useEffect, useRef } from "react";
import { Drawings } from "../../types/general";
import { useDrawing, useLocation } from "../../store/Store";
import CompOverlay from "../ui/CompOverlay";

export default function Text(prop: Drawings<"text">[0]) {
  const textRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const setLocation = useLocation((state) => state.setLocation);
  const { drawing, updateDrawing } = useDrawing();
  useEffect(() => {
    const { width, height, x, y } = containerRef.current
      ?.getBoundingClientRect()
      .toJSON();
    setLocation({
      width,
      height,
      x,
      y,
      id: prop.id,
    });
  }, [containerRef.current?.offsetWidth, containerRef.current?.offsetHeight]);
  return (
    <div
      ref={containerRef}
      id={`${prop.id}`}
      className={`z-50 ${prop.hovered && "border-green-500"}`}
      style={{
        left: `${prop.pos.x}px`,
        top: `${prop.pos.y}px`,
        backgroundColor: `transparent`,
        color: prop.color,
        opacity: prop.opacity,
        fontSize: prop.font,
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <input
        name={`${prop.id}`}
        id={`${prop.id}`}
        ref={textRef}
        width={4}
        height={prop.font}
        className="bg-transparent"
        onChange={(e) =>
          (e.currentTarget.style.width = `${e.currentTarget.scrollWidth}px`)
        }
        onMouseLeave={(e) => {
          if (!textRef.current) return;
          let edit = {
            ...drawing[prop.id],
            prop: { ...prop.prop, value: e.currentTarget.value },
          };
          updateDrawing(prop.id, edit);
        }}
        defaultValue={prop.prop.value}
        placeholder="Enter your text"
      ></input>

      {prop.highlight && prop.opacity !== 0 && (
        <CompOverlay id={prop.id} opacity={prop.opacity} type={"text"} />
      )}
    </div>
  );
}
