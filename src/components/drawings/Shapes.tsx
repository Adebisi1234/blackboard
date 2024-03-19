import { useRef } from "react";
import { Drawings } from "../../types/general";
import CompOverlay from "../ui/CompOverlay";

export default function Shapes(prop: Drawings<"shape">[0]) {
  const containerRef = useRef<SVGSVGElement>(null);
  return (
    <>
      <svg ref={containerRef} id={`${prop.id}`}>
        <rect
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
        ></rect>
      </svg>
      {prop.highlight && prop.opacity !== 0 && (
        <CompOverlay id={prop.id} opacity={prop.opacity} type={"others"} />
      )}
    </>
  );
}
