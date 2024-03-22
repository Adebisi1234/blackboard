import { useEffect, useRef } from "react";
import { Drawings } from "../../types/general";
import CompOverlay from "../ui/CompOverlay";
import { useLocation } from "../../store/Store";

export default function Shapes(prop: Drawings<"shape">[0]) {
  const rectRef = useRef<SVGRectElement>(null);
  const setLocation = useLocation((state) => state.setLocation);
  useEffect(() => {

    if (!rectRef.current) return;
    const { width, height, x, y } = rectRef.current
      ?.getBoundingClientRect()
      .toJSON();
    setLocation({
      x,
      y,
      width,
      height,
      id: prop.id,
    });
  }, [prop.prop.width, prop.prop.height, prop.prop.pos]);
  return (
    <>
      <svg id={`${prop.id}`}>
        <rect
          ref={rectRef}
          id={`${prop.id}`}
          rx={15}
          x={prop.prop.pos.x}
          y={prop.prop.pos.y}
          width={prop.prop.width}
          height={prop.prop.height}
          stroke={prop.color}
          fillOpacity={prop.fill}
          fill={prop.color}
          opacity={prop.opacity}
          strokeDasharray={prop.dash}
          strokeWidth={prop.strokeWidth}
        ></rect>
        {prop.hovered && (
          <rect
            id={`${prop.id}`}
            rx={15}
            x={prop.prop.pos.x}
            y={prop.prop.pos.y}
            width={prop.prop.width}
            height={prop.prop.height}
            stroke={"green"}
            fillOpacity={prop.fill}
            fill={"none"}
            opacity={prop.opacity}
            strokeDasharray={prop.dash}
            strokeWidth={1.5}
          ></rect>
        )}
      </svg>
      {prop.highlight && prop.opacity !== 0 && (
        <CompOverlay id={prop.id} opacity={prop.opacity} type={"shape"} />
      )}
    </>
  );
}
