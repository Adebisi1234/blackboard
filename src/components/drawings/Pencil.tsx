import { useEffect, useRef } from "react";
import { useCanvas, useLocation } from "../../store/Store";
import { Drawings } from "../../types/general";
import CompOverlay from "../ui/CompOverlay";
import useWindowSize from "../../hooks/useWindowSize";

export default function Pencil(prop: Drawings<"pencil">[0]) {
  const canvasPos = useCanvas((s) => s.canvasPos);
  const setLocation = useLocation((state) => state.setLocation);
  const pathRef = useRef<SVGPathElement>(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const d = prop.prop.path
    .map(({ func, x, y }) => {
      return `${func} ${x * prop.scale} ${y * prop.scale}`;
    })
    .join(" ");
  useEffect(() => {
    if (!pathRef.current) return;
    const { width, height, x, y } = pathRef.current.getBoundingClientRect();
    setLocation({
      x,
      y,
      width,
      height,
      id: prop.id,
    });
  }, [
    prop.prop.path,
    canvasPos,
    prop.pos.x,
    prop.pos.y,
    windowWidth,
    windowHeight,
    windowHeight,
  ]);
  return (
    <>
      <svg
        id={`${prop.id}`}
        style={{
          transform: `translate(${prop.pos.x}px, ${prop.pos.y}px)`,
        }}
      >
        <g id={`${prop.id}`} opacity={prop.opacity}>
          <path
            data-testid={prop.id}
            id={`${prop.id}`}
            ref={pathRef}
            d={d}
            stroke={prop.color}
            strokeWidth={prop.strokeWidth}
            strokeDasharray={prop.dash}
            fillOpacity={prop.fill}
            fillRule="evenodd"
            fill={prop.color}
            className={`z-${prop.id}`}
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          {prop.hovered && (
            <path
              id={`${prop.id}`}
              data-testid={`hovered-${prop.id}`}
              d={`${d} z`}
              stroke={"green"}
              strokeWidth={prop.strokeWidth / 2}
              fill="none"
              className={`z-${prop.id}`}
            ></path>
          )}
        </g>
      </svg>

      {prop.highlight && prop.opacity !== 0 && (
        <CompOverlay
          id={prop.id}
          opacity={prop.opacity}
          type={"pencil"}
          drawing={prop}
        />
      )}
    </>
  );
}
// For changing size just multiply each point by the diff and add
