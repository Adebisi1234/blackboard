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

export default function Arrow(prop: Drawings<"arrow">[0]) {
  const { activeTool } = useActiveTool();
  const { startPos, endPos, qCurve } = prop.prop;
  const [moveComp, setMoveComp] = useState(false);
  const updateDrawing = useDrawing((state) => state.updateDrawing);
  const canvasPos = useCanvas((s) => s.canvasPos);

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
  }, [endPos, canvasPos, startPos]);
  return (
    <>
      <svg id={`${prop.id}`} data-copy={`${prop.copy}`} fill="none">
        <g
          id={`${prop.id}`}
          opacity={prop.opacity}
          // onMouseDown={(ev) => {
          //   ev.stopPropagation();
          //   activeTool === "hand" && setMoveComp(true);
          // }}
          // onMouseMove={(ev) => {
          //   ev.stopPropagation();
          //   if (!moveComp) return;
          //   console.log("moving");
          //   const edit = produce(prop, (draft) => {
          //     draft.prop.startPos.x += ev.movementX;
          //     draft.prop.endPos.x += ev.movementX;

          //     draft.prop.startPos.y += ev.movementY;
          //     draft.prop.endPos.y += ev.movementY;
          //     if (draft.prop.qCurve) {
          //       draft.prop.qCurve.x += ev.movementX;
          //       draft.prop.qCurve.y += ev.movementY;
          //     }
          //   });
          //   updateDrawing(prop.id, edit);
          // }}
          // onMouseUp={(ev) => {
          //   setMoveComp(false);
          // }}
        >
          <path
            id={`${prop.id}`}
            d={`M ${startPos.x} ${startPos.y} ${
              !qCurve ? "L" : `Q ${qCurve.x} ${qCurve.y} `
            } ${endPos.x} ${endPos.y}`}
            stroke={prop.color}
            strokeWidth={prop.strokeWidth}
            strokeDasharray={prop.dash}
            className="z-20"
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
              className="z-20"
            ></path>
          )}
        </g>
      </svg>
      {prop.highlight && prop.opacity !== 0 && (
        <CompOverlay id={prop.id} opacity={prop.opacity} type={"arrow"} />
      )}
    </>
  );
}
