import { useLocation } from "../../store/Store";
import { Drawings } from "../../types/general";

type Prop = {
  type: "arrow" | "pencil" | "image" | "shape" | "text" | "note";
  id: number;
  opacity: number;
  drawing?: Drawings<Prop["type"]>[0];
};

export default function CompOverlay(prop: Prop) {
  const location = useLocation((state) => state.location);
  if (prop.type === "arrow") {
    const {
      prop: { startPos, endPos, qCurve },
    } = prop.drawing as Drawings<"arrow">[0];
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
              <Circle
                cx={startPos.x}
                cy={startPos.y}
                r={6}
                dataComp="arrow"
                dataCompId={prop.id}
                pos="start"
              />
              <Circle
                cx={qCurve ? qCurve.x : (endPos.x + startPos.x) / 2}
                cy={qCurve ? qCurve.y : (endPos.y + startPos.y) / 2}
                r={6}
                dataComp="arrow"
                dataCompId={prop.id}
                pos="mid"
              />
              <Circle
                cx={endPos.x}
                cy={endPos.y}
                r={6}
                dataComp="arrow"
                dataCompId={prop.id}
                pos="end"
              />
            </g>
          </svg>
        )}
      </>
    );
  }
  if (prop.type === "pencil") {
    const pencil = prop.drawing as Drawings<"pencil">[0];
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
              <Circle
                cx={startX + (pos.x ?? 0)}
                cy={startY + (pos.y ?? 0)}
                r={6}
                dataComp={prop.type}
                dataCompId={prop.id}
                pos="start"
              />
              <Circle
                cx={endX + (pos.x ?? 0)}
                cy={endY + (pos.y ?? 0)}
                r={6}
                dataComp={prop.type}
                dataCompId={prop.id}
                pos="end"
              />
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
            {prop.type !== "note" && (
              <>
                <Circle
                  cx={x}
                  cy={y}
                  r={6}
                  dataComp={prop.type}
                  dataCompId={prop.id}
                  pos="tl"
                />
                <Circle
                  cx={x + width}
                  cy={y}
                  r={6}
                  dataComp={prop.type}
                  dataCompId={prop.id}
                  pos="tr"
                />
                <Circle
                  cx={x}
                  cy={y + height}
                  r={6}
                  dataComp={prop.type}
                  dataCompId={prop.id}
                  pos="bl"
                />
                <Circle
                  cx={x + width}
                  cy={y + height}
                  r={6}
                  dataComp={prop.type}
                  dataCompId={prop.id}
                  pos="br"
                />
              </>
            )}
          </g>
        </svg>
      )}
    </>
  );
}

function Circle(prop: {
  cx: number;
  cy: number;
  r?: number;
  dataComp: string;
  dataCompId: number;
  pos: string;
}) {
  return (
    <>
      <circle
        cx={prop.cx}
        cy={prop.cy}
        r={16}
        stroke="none"
        fill="#40c05738"
        data-comp={prop.dataComp}
        data-comp-id={prop.dataCompId}
        className="adjust"
        data-pos={prop.pos}
      ></circle>
      <circle
        cx={prop.cx}
        cy={prop.cy}
        r={prop.r ? prop.r : 6}
        stroke="blue"
        fill="white"
        data-comp={prop.dataComp}
        data-comp-id={prop.dataCompId}
        className="adjust"
        data-pos={prop.pos}
      ></circle>
    </>
  );
}
