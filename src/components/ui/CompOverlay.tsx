import { useRef, useState } from "react";
import {
  useActiveTool,
  useCanvas,
  useDrawing,
  useLocation,
} from "../../store/Store";
import { Drawings } from "../../types/general";

type Prop = {
  type: "arrow" | "others";
  id: number;
  opacity: number;
};

export default function CompOverlay(prop: Prop) {
  const canvasPos = useCanvas((state) => state.canvasPos);
  const { activeTool, setActiveTool } = useActiveTool();
  const prev = useRef(activeTool);
  const { drawing, updateDrawing } = useDrawing();
  const location = useLocation((state) => state.location);
  const [active, setActive] = useState(false);
  if (prop.type === "arrow") {
    const {
      prop: { startPos, endPos, qCurve },
    } = drawing[prop.id] as Drawings<"arrow">[0];
    return (
      <svg opacity={prop.opacity === 0 ? 0 : 1} fill="none">
        <g>
          <path
            d={`M ${startPos.x} ${startPos.y} ${
              !qCurve
                ? `L ${endPos.x} ${endPos.y}`
                : `L ${qCurve.x} ${qCurve.y} M ${qCurve.x} ${qCurve.y} L ${endPos.x} ${endPos.y}`
            }`}
            strokeWidth={0.5}
            stroke="green"
          ></path>
          <circle
            cx={startPos.x}
            cy={startPos.y}
            r={7}
            stroke="blue"
            fill="white"
            data-comp="arrow"
            onMouseDown={(e) => {
              setActiveTool("pointer");
            }}
            onMouseUp={() => {
              setActiveTool(prev.current);
            }}
            data-comp-id={prop.id}
            data-pos="end"
          ></circle>
          <circle
            cx={qCurve ? qCurve.x : (endPos.x + startPos.x) / 2}
            cy={qCurve ? qCurve.y : (endPos.y + startPos.y) / 2}
            r={7}
            stroke="blue"
            fill="white"
            data-comp="arrow"
            data-comp-id={prop.id}
            data-pos="mid"
          ></circle>
          <circle
            cx={endPos.x}
            cy={endPos.y}
            r={7}
            stroke="blue"
            fill="white"
            data-comp="arrow"
            onMouseDown={(e) => {
              setActiveTool("pointer");
            }}
            onMouseUp={() => {
              setActiveTool(prev.current);
            }}
            data-comp-id={prop.id}
            data-pos="top"
          ></circle>
        </g>
      </svg>
    );
  }
  let { x, y, width, height } = location[prop.id];
  x = x - canvasPos.x;
  y = y - canvasPos.y;
  return (
    <svg className="z-40">
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fillOpacity={0}
          fill="none"
          stroke="white"
        ></rect>
        <circle
          cx={x}
          cy={y}
          r={7}
          stroke="blue"
          fill="white"
          data-comp="others"
          data-comp-id={prop.id}
          data-pos="t-left"
        ></circle>
        <circle
          cx={x + width}
          cy={y}
          r={7}
          stroke="blue"
          fill="white"
          data-comp="others"
          data-comp-id={prop.id}
          data-pos="t-right"
        ></circle>
        <circle
          cx={x}
          cy={y + height}
          r={7}
          stroke="blue"
          fill="white"
          data-comp="others"
          data-comp-id={prop.id}
          data-pos="b-left"
        ></circle>
        <circle
          cx={x + width}
          cy={y + height}
          r={7}
          stroke="blue"
          fill="white"
          data-comp="others"
          data-comp-id={prop.id}
          data-pos="b-right"
        ></circle>
      </g>
    </svg>
  );
}
