import React, { useEffect, useState } from "react";
import { ArrowHead } from "./ArrowHead";
import { getDiff, getRelativeMin, pythag } from "../../utils/drawings";
import { useLocationDispatch } from "../../context/StateContext";
import { useActiveTool } from "../Canvas";

export type ArrowProp = {
  id: number;
  color: string;
  // Curve to
  startPos: {
    x: number;
    y: number;
  };
  endPos: {
    x: number;
    y: number;
  };
  opacity: number;
  strokeWidth?: number;
  type: "arrow";
  highlight?: boolean;
};

export default React.forwardRef<SVGSVGElement, ArrowProp>(function Arrow(
  {
    startPos,
    endPos,
    id,
    color,
    opacity,
    strokeWidth = 3,
    highlight,
  }: ArrowProp,
  activeCompRef
) {
  const dispatch = useLocationDispatch();
  const activeTool = useActiveTool();
  useEffect(() => {
    dispatch({
      id,
      loc: {
        id,
        x: getRelativeMin(startPos.x, endPos.x),
        y: getRelativeMin(startPos.y, endPos.y),
        width: getDiff(startPos.x, endPos.x),
        height: getDiff(startPos.y, endPos.y),
      },
    });
  }, [startPos, endPos]);
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
      id={`${id}`}
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      opacity={opacity}
      ref={activeCompRef}
    >
      <g
        id={`${id}`}
        onMouseOver={() => {
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
      >
        <path
          id={`${id}`}
          onMouseOver={() => {
            setHovered(true);
          }}
          onMouseLeave={() => setHovered(false)}
          d={`M ${startPos.x} ${startPos.y} L ${endPos.x} ${endPos.y}`}
          stroke={color}
          strokeWidth={strokeWidth}
          className="z-20"
        ></path>
        {pythag({
          x1: startPos.x,
          x2: endPos.x,
          y1: startPos.y,
          y2: endPos.y,
        }) > 5 && (
          <ArrowHead
            id={`${id}`}
            onMouseOver={() => {
              setHovered(true);
            }}
            onMouseLeave={() => setHovered(false)}
            x={endPos.x}
            y={endPos.y}
            angle={angle}
            strokeWidth={strokeWidth}
            color={color}
          />
        )}
        {(hovered || highlight) && activeTool === "pointer" && (
          <path
            d={`M ${startPos.x} ${startPos.y} L ${endPos.x} ${endPos.y}`}
            stroke={"green"}
            strokeWidth={strokeWidth / 2}
            className="z-20"
          ></path>
        )}
      </g>
    </svg>
  );
});
