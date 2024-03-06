import React, { useEffect, useRef, useState } from "react";
import { useActiveTool, useDrawing, useLocation } from "../../store/Store";
import { Drawings } from "../../types/general";
import CompOverlay from "../ui/CompOverlay";

export default React.forwardRef<SVGSVGElement, Drawings<"pencil">[0]>(
  function Pencil(prop, activeCompRef) {
    const { activeTool } = useActiveTool();
    const setLocation = useLocation((state) => state.setLocation);
    const pathRef = useRef<SVGPathElement>(null);
    const d = prop.prop.path
      .map(({ func, x, y }) => {
        return `${func} ${x * prop.scale} ${y * prop.scale}`;
      })
      .join(" ");
    const toggleHighlight = useDrawing((state) => state.toggleHighlight);
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
    }, [prop.prop.path]);
    return (
      <>
        <svg id={`${prop.id}`} ref={activeCompRef}>
          <g id={`${prop.id}`} opacity={prop.opacity}>
            <path
              id={`${prop.id}`}
              ref={pathRef}
              onClick={() => {
                toggleHighlight(prop.id);
              }}
              d={`${d} z`}
              stroke={prop.color}
              strokeWidth={prop.strokeWidth}
              strokeDasharray={prop.dash}
              fill="none"
              className="z-20"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            {prop.hovered && activeTool === "pointer" && (
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

        {prop.highlight && (
          <CompOverlay
            id={prop.id}
            type={"others"}
            prop={{
              x: pathRef.current?.getBoundingClientRect().x ?? 0,
              y: pathRef.current?.getBoundingClientRect().y ?? 0,
              width: pathRef.current?.getBoundingClientRect().width ?? 0,
              height: pathRef.current?.getBoundingClientRect().height ?? 0,
            }}
          />
        )}
      </>
    );
  }
);
// For changing size just multiply each point by the diff and add
