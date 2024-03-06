import { useState, forwardRef, useEffect, useRef } from "react";
import { ArrowHead } from "./ArrowHead";
import { pythag } from "../../utils/math";
import { type Drawings } from "../../types/general";
import { useActiveTool, useDrawing, useLocation } from "../../store/Store";
import CompOverlay from "../ui/CompOverlay";

export default forwardRef<SVGSVGElement, Drawings<"arrow">[0]>(function Arrow(
  prop,
  activeCompRef
) {
  const { activeTool } = useActiveTool();
  const { startPos, endPos } = prop.prop;

  const headAngle = (() => {
    const dx = endPos.x - startPos.x;
    const dy = endPos.y - startPos.y;
    let theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    if (theta < 0) theta += 360;
    return theta;
  })();
  const setLocation = useLocation((state) => state.setLocation);
  const arrowRef = useRef<SVGPathElement>(null!);
  const toggleHighlight = useDrawing((state) => state.toggleHighlight);
  useEffect(() => {
    if (!arrowRef.current) return;
    const { width, height, x, y } = arrowRef.current
      ?.getBoundingClientRect()
      .toJSON();
    setLocation({
      id: prop.id,
      x,
      y,
      width,
      height,
    });
  }, [endPos]);
  return (
    <>
      <svg id={`${prop.id}`} ref={activeCompRef}>
        <g id={`${prop.id}`} opacity={prop.opacity}>
          <path
            id={`${prop.id}`}
            d={`M ${startPos.x} ${startPos.y} L ${endPos.x} ${endPos.y}`}
            stroke={prop.color}
            strokeWidth={prop.strokeWidth}
            className="z-20"
            ref={arrowRef}
            onMouseDown={() => {
              activeTool === "pointer" && toggleHighlight(prop.id);
            }}
          ></path>
          {pythag({
            x1: startPos.x,
            x2: endPos.x,
            y1: startPos.y,
            y2: endPos.y,
          }) > 5 && (
            <ArrowHead
              id={`${prop.id}`}
              x={endPos.x}
              y={endPos.y}
              angle={headAngle}
              strokeWidth={prop.strokeWidth}
              color={prop.color}
            />
          )}
          {prop.hovered && activeTool === "pointer" && (
            <path
              d={`M ${startPos.x} ${startPos.y} L ${endPos.x} ${endPos.y}`}
              stroke={"green"}
              strokeWidth={prop.strokeWidth / 2}
              className="z-20"
            ></path>
          )}
        </g>
      </svg>
      {prop.highlight && (
        <CompOverlay id={prop.id} type={"arrow"} prop={{ startPos, endPos }} />
      )}
    </>
  );
});
