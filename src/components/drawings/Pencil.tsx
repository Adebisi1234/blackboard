import React, { useEffect, useRef, useState } from "react";
import {
  useActiveTool,
  useCanvas,
  useDrawing,
  useLocation,
} from "../../store/Store";
import { Drawings } from "../../types/general";
import CompOverlay from "../ui/CompOverlay";

export default React.forwardRef<SVGSVGElement, Drawings<"pencil">[0]>(
  function Pencil(prop, activeCompRef) {
    const { activeTool } = useActiveTool();
    const canvasPos = useCanvas((s) => s.canvasPos);
    const setLocation = useLocation((state) => state.setLocation);
    const pathRef = useRef<SVGPathElement>(null);
    const d = prop.prop.path
      .map(({ func, x, y }) => {
        return `${func} ${x * prop.scale} ${y * prop.scale}`;
      })
      .join(" ");
    useEffect(() => {
      if (!pathRef.current) return;
      const { width, height, x, y } = pathRef.current
        ?.getBoundingClientRect()
        .toJSON();
      setLocation({
        x,
        y,
        width,
        height,
        id: prop.id,
      });
    }, [prop.prop.path, canvasPos]);
    return (
      <>
        <svg id={`${prop.id}`} data-copy={`${prop.copy}`} ref={activeCompRef}>
          <g id={`${prop.id}`} opacity={prop.opacity}>
            <path
              id={`${prop.id}`}
              ref={pathRef}
              d={`${d} z`}
              stroke={prop.color}
              strokeWidth={prop.strokeWidth}
              strokeDasharray={prop.dash}
              fillOpacity={prop.fill}
              fillRule="evenodd"
              fill={prop.color}
              className="z-20"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            {prop.hovered && (
              <path
                id={`${prop.id}`}
                d={`${d} z`}
                stroke={"green"}
                strokeWidth={prop.strokeWidth / 2}
                fill="none"
                className="z-20"
              ></path>
            )}
          </g>
        </svg>

        {prop.highlight && prop.opacity !== 0 && (
          <CompOverlay id={prop.id} opacity={prop.opacity} type={"pencil"} />
        )}
      </>
    );
  }
);
// For changing size just multiply each point by the diff and add
