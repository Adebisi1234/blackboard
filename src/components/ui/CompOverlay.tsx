import { useDrawing, useLocation } from "../../store/Store";
import { Drawings } from "../../types/general";

type Prop = {
  type: "arrow" | "pencil" | "image" | "shape" | "text" | "note";
  id: number;
  opacity: number;
};

export default function CompOverlay(prop: Prop) {
  const drawing = useDrawing((state) => state.getDrawing());
  const location = useLocation((state) => state.location);
  if (prop.type === "arrow") {
    const {
      prop: { startPos, endPos, qCurve },
    } = drawing[prop.id] as Drawings<"arrow">[0];
    return (
      <>
        {startPos.x !== endPos.x && startPos.y !== endPos.y && (
          <svg
            opacity={prop.opacity === 0 ? 0 : 1}
            fill="none"
            data-testid={`overlay-${prop.id}`}
          >
            <g>
              <path
                d={`M ${startPos.x} ${startPos.y} ${
                  !qCurve
                    ? `L ${endPos.x} ${endPos.y}`
                    : `L ${qCurve.x} ${qCurve.y} M ${qCurve.x} ${qCurve.y} L ${endPos.x} ${endPos.y}`
                }`}
                strokeWidth={1}
                stroke="green"
              ></path>
              <circle
                cx={startPos.x}
                cy={startPos.y}
                r={6}
                stroke="blue"
                fill="white"
                data-comp="arrow"
                data-comp-id={prop.id}
                className="adjust"
                data-pos="start"
              ></circle>
              <circle
                cx={qCurve ? qCurve.x : (endPos.x + startPos.x) / 2}
                cy={qCurve ? qCurve.y : (endPos.y + startPos.y) / 2}
                r={6}
                stroke="blue"
                fill="white"
                data-comp="arrow"
                data-comp-id={prop.id}
                className="adjust"
                data-pos="mid"
              ></circle>
              <circle
                cx={endPos.x}
                cy={endPos.y}
                r={6}
                stroke="blue"
                fill="white"
                data-comp="arrow"
                data-comp-id={prop.id}
                className="adjust"
                data-pos="end"
              ></circle>
            </g>
          </svg>
        )}
      </>
    );
  }
  if (prop.type === "pencil") {
    const pencil = drawing[prop.id] as Drawings<"pencil">[0];
    const path = pencil.prop.path;
    const pos = pencil.pos;

    const { x: startX, y: startY } = path[0];
    const { x: endX, y: endY } = path[path.length - 1];

    return (
      <>
        {path.length > 5 && (
          <svg
            className={`z-${10 + prop.id}`}
            opacity={prop.opacity === 0 ? 0 : 1}
            data-testid={`overlay-${prop.id}`}
          >
            <g>
              <circle
                cx={startX + (pos.x ?? 0)}
                cy={startY + (pos.y ?? 0)}
                r={6}
                stroke="blue"
                fill="white"
                data-comp={prop.type}
                data-comp-id={prop.id}
                className="adjust"
                data-pos="start"
              ></circle>
              <circle
                cx={endX + (pos.x ?? 0)}
                cy={endY + (pos.y ?? 0)}
                r={6}
                stroke="blue"
                fill="white"
                data-comp={prop.type}
                data-comp-id={prop.id}
                className="adjust"
                data-pos="end"
              ></circle>
            </g>
          </svg>
        )}
      </>
    );
  }

  // Square
  const { x, y, width, height } = location[prop.id];

  return (
    <>
      {width > 0 && height > 0 && (
        <svg
          className={`z-${10 + prop.id}`}
          opacity={prop.opacity === 0 ? 0 : 1}
          data-testid={`overlay-${prop.id}`}
        >
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
              r={6}
              stroke="blue"
              fill="white"
              data-comp={prop.type}
              data-comp-id={prop.id}
              className="adjust"
              data-pos="tl"
            ></circle>
            <circle
              cx={x + width}
              cy={y}
              r={6}
              stroke="blue"
              fill="white"
              data-comp={prop.type}
              data-comp-id={prop.id}
              className="adjust"
              data-pos="tr"
            ></circle>
            <circle
              cx={x}
              cy={y + height}
              r={6}
              stroke="blue"
              fill="white"
              data-comp={prop.type}
              data-comp-id={prop.id}
              className="adjust"
              data-pos="bl"
            ></circle>
            <circle
              cx={x + width}
              cy={y + height}
              r={6}
              stroke="blue"
              fill="white"
              data-comp={prop.type}
              data-comp-id={prop.id}
              className="adjust"
              data-pos="br"
            ></circle>
          </g>
        </svg>
      )}
    </>
  );
}
