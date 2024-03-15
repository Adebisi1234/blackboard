import { forwardRef } from "react";
import { Drawings } from "../../types/general";

export default forwardRef<SVGSVGElement, Drawings<"shapes">[0]>(function Shapes(
  prop,
  activeCompRef
) {
  return (
    <svg ref={activeCompRef} id={`${prop.id}`}>
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
  );
});
