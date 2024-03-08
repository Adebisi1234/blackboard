import { useCanvas } from "../../store/Store";

type ArrowProp = {
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
};
type Others = {
  x: number;
  y: number;
  width: number;
  height: number;
};
type Prop<T = any> = {
  type: T;
  prop: T extends "arrow" ? ArrowProp : Others;
  id: number;
};

export default function CompOverlay(prop: Prop) {
  const canvasPos = useCanvas((state) => state.canvasPos);
  if (prop.type === "arrow") {
    const { startPos, endPos } = (prop as Prop<"arrow">).prop;
    return (
      <svg>
        <g>
          <path
            d={`M ${startPos.x} ${startPos.y} L ${endPos.x} ${endPos.y} z`}
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
            data-comp-id={prop.id}
            data-pos="end"
          ></circle>
          <circle
            cx={(endPos.x + startPos.x) / 2}
            cy={(endPos.y + startPos.y) / 2}
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
            data-comp-id={prop.id}
            data-pos="top"
          ></circle>
        </g>
      </svg>
    );
  }
  let { x, y, width, height } = (prop as Prop<"others">).prop;
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
