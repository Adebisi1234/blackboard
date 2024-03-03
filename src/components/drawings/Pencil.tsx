import React, { useEffect, useRef, useState } from "react";
import { useActiveTool, useDrawing } from "../../store/Store";
import { Drawings } from "../../types/general";

export default React.forwardRef<SVGSVGElement, Drawings<"pencil">[0]>(
  function Pencil(prop, activeCompRef) {
    const { activeTool } = useActiveTool();
    const { updateDrawing, drawing } = useDrawing();
    const [hovered, setHovered] = useState(false);
    const pathRef = useRef<SVGPathElement>(null);
    const d = prop.prop.path
      .map(({ func, x, y }) => {
        return `${func} ${x * prop.scale} ${y * prop.scale}`;
      })
      .join(" ");

    // useEffect(() => {
    //   let edit = {
    //     ...drawing[prop.id],
    //     location: {
    //       x: pathRef.current?.getBBox().x ?? 0,
    //       y: pathRef.current?.getBBox().y ?? 0,
    //       width: pathRef.current?.getBBox().width ?? 0,
    //       height: pathRef.current?.getBBox().height ?? 0,
    //     },
    //   };
    //   updateDrawing(prop.id, edit);
    // }, [prop.prop.path]);
    return (
      <svg
        id={`${prop.id}`}
        ref={activeCompRef}
        onMouseOver={() => {
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
      >
        <g
          id={`${prop.id}`}
          opacity={prop.opacity}
          onMouseOver={() => {
            setHovered(true);
          }}
          onMouseLeave={() => setHovered(false)}
        >
          <path
            id={`${prop.id}`}
            onMouseOver={() => {
              setHovered(true);
            }}
            ref={pathRef}
            onMouseLeave={() => setHovered(false)}
            d={`${d} z`}
            stroke={prop.color}
            strokeWidth={prop.strokeWidth}
            strokeDasharray={prop.dash}
            fill="none"
            className="z-20"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          {(hovered || prop.highlight) && activeTool === "pointer" && (
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
    );
  }
);
// For changing size just multiply each point by the diff and add
