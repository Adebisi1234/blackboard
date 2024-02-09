import React, { useState } from "react";

export type PencilProp = {
  color: string;
  id: number;
  path: (
    | {
        func: "M";
        x: number;
        y: number;
      }
    | {
        func: "L";
        x: number;
        y: number;
      }
  )[];
  opacity: number;
  strokeWidth?: number;
  scale: number;
  dash: string;
  highlight?: boolean;
  type: "pencil";
};
export default React.forwardRef<SVGSVGElement, PencilProp>(function Pencil(
  {
    color,
    id,
    path,
    opacity,
    scale = 1,
    strokeWidth = 3,
    highlight = false,
    dash,
  }: PencilProp,
  activeCompRef
) {
  const [hovered, setHovered] = useState(false);
  const d = path
    .map(({ func, x, y }) => {
      return `${func} ${x * scale} ${y * scale}`;
    })
    .join(" ");
  return (
    <svg
      id={`${id}`}
      opacity={opacity}
      ref={activeCompRef}
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
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
          d={`${d} z`}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={dash}
          fill="none"
          className="z-20"
        ></path>
        {hovered && (
          <path
            id={`${id}`}
            d={`${d} z`}
            stroke={"green"}
            strokeWidth={strokeWidth / 2}
            fill="none"
            className="z-20"
          ></path>
        )}
      </g>
    </svg>
  );
});
// For changing size just multiply each point by the diff and add
