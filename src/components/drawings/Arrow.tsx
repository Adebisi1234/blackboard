import { useState, forwardRef } from "react";
import { ArrowHead } from "./ArrowHead";
import { pythag } from "../../utils/math";
import { type Drawings } from "../../types/general";
import { useActiveTool } from "../../store/Store";

export default forwardRef<SVGSVGElement, Drawings<"arrow">[0]>(function Arrow(
  prop,
  activeCompRef
) {
  const { activeTool } = useActiveTool();
  const { startPos, endPos } = prop.prop;

  const angle = (() => {
    const dx = endPos.x - startPos.x;
    const dy = endPos.y - startPos.y;
    let theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    if (theta < 0) theta += 360;
    return theta;
  })();
  const [hovered, setHovered] = useState(false);

  return (
    <svg
      id={`${prop.id}`}
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      ref={activeCompRef}
    >
      <g
        id={`${prop.id}`}
        onMouseOver={() => {
          setHovered(true);
        }}
        opacity={prop.opacity}
        onMouseLeave={() => setHovered(false)}
      >
        <path
          id={`${prop.id}`}
          onMouseOver={() => {
            setHovered(true);
          }}
          onMouseLeave={() => setHovered(false)}
          d={`M ${startPos.x} ${startPos.y} L ${endPos.x} ${endPos.y}`}
          stroke={prop.color}
          strokeWidth={prop.strokeWidth}
          className="z-20"
        ></path>
        {pythag({
          x1: startPos.x,
          x2: endPos.x,
          y1: startPos.y,
          y2: endPos.y,
        }) > 5 && (
          <ArrowHead
            id={`${prop.id}`}
            onMouseOver={() => {
              setHovered(true);
            }}
            onMouseLeave={() => setHovered(false)}
            x={endPos.x}
            y={endPos.y}
            angle={angle}
            strokeWidth={prop.strokeWidth}
            color={prop.color}
          />
        )}
        {(hovered || prop.highlight) && activeTool === "pointer" && (
          <path
            d={`M ${startPos.x} ${startPos.y} L ${endPos.x} ${endPos.y}`}
            stroke={"green"}
            strokeWidth={prop.strokeWidth / 2}
            className="z-20"
          ></path>
        )}
      </g>
    </svg>
  );
});
