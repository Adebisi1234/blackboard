import { useEffect, useRef, useState } from "react";
import { ArrowHead } from "./ArrowHead";
import { pythag } from "../../utils/math";
import { type Drawings } from "../../types/general";
import {
  useActiveTool,
  useCanvas,
  useDrawing,
  useLocation,
} from "../../store/Store";
import CompOverlay from "../ui/CompOverlay";
import { produce } from "immer";
import useWindowSize from "../../hooks/useWindowSize";

export default function Arrow(prop: Drawings<"arrow">[0]) {
  const { startPos, endPos, qCurve } = prop.prop;
  const canvasPos = useCanvas((s) => s.canvasPos);
  const [windowWidth, windowHeight] = useWindowSize();

  const headAngle = (() => {
    const dx = endPos.x - (qCurve ? qCurve.x : startPos.x);
    const dy = endPos.y - (qCurve ? qCurve.y : startPos.y);
    let theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    if (theta < 0) theta += 360;
    return theta;
  })();
  const setLocation = useLocation((state) => state.setLocation);
  const arrowRef = useRef<SVGPathElement>(null!);
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
  }, [endPos, canvasPos, startPos, windowWidth, windowHeight, qCurve]);
  return (
    <>
      <svg id={`${prop.id}`} fill="none">
        <g id={`${prop.id}`} opacity={prop.opacity}>
          <path
            id={`${prop.id}`}
            d={`M ${startPos.x} ${startPos.y} ${
              !qCurve ? "L" : `Q ${qCurve.x} ${qCurve.y} `
            } ${endPos.x} ${endPos.y}`}
            stroke={prop.color}
            strokeWidth={prop.strokeWidth}
            strokeDasharray={prop.dash}
            className={`z-${prop.id}`}
            ref={arrowRef}
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
          {prop.hovered && (
            <path
              d={`M ${startPos.x} ${startPos.y} ${
                !qCurve ? "L" : `Q ${qCurve.x} ${qCurve.y} `
              } ${endPos.x} ${endPos.y}`}
              stroke={"green"}
              strokeWidth={prop.strokeWidth / 2}
              className={`z-${prop.id}`}
            ></path>
          )}
        </g>
      </svg>
      {prop.highlight && prop.opacity !== 0 && (
        <CompOverlay
          id={prop.id}
          opacity={prop.opacity}
          type={"arrow"}
          drawing={prop}
        />
      )}
    </>
  );
}
