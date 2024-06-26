import { useEffect, useRef, useState } from "react";
import { Drawings } from "../../types/general";
import CompOverlay from "../ui/CompOverlay";
import { useActiveTool, useDrawing, useLocation } from "../../store/Store";
import { produce } from "immer";
import useWindowSize from "../../hooks/useWindowSize";

export default function Shapes(prop: Drawings<"shape">[0]) {
  const shapeRef = useRef<SVGRectElement | SVGCircleElement | SVGPathElement>(
    null
  );
  const [setLocation, location] = useLocation((state) => [
    state.setLocation,
    state.location,
  ]);
  const [moveComp, setMoveComp] = useState(false);
  const { activeTool, setActiveTool } = useActiveTool();
  const [windowWidth, windowHeight] = useWindowSize();
  const updateDrawing = useDrawing((s) => s.updateDrawing);
  useEffect(() => {
    if (!shapeRef.current) return;
    const { x, y, width, height } = shapeRef.current.getBoundingClientRect();

    setLocation({
      x,
      y,
      width,
      height,
      id: prop.id,
    });
  }, [
    prop.prop.width,
    prop.prop.height,
    prop.prop.pos,
    prop.prop.radius,
    windowWidth,
    windowHeight,
    windowHeight,
  ]);
  return (
    <>
      <svg id={`${prop.id}`}>
        <g
          onPointerDown={() => {
            activeTool === "hand" && setMoveComp(true);
          }}
          onPointerMove={(ev) => {
            if (!moveComp) return;
            ev.bubbled = true;
            const edit = produce(prop, (draft) => {
              draft.prop.pos.x += ev.movementX;
              draft.prop.pos.y += ev.movementY;
            });
            updateDrawing(prop.id, edit);
          }}
          onPointerUp={() => {
            moveComp && setMoveComp(false);
          }}
          onPointerLeave={() => {
            moveComp && setMoveComp(false);
          }}
          onDoubleClick={() => {
            setActiveTool("hand");
            setMoveComp(true);
          }}
          stroke={prop.color}
          fillOpacity={prop.fill}
          fill={prop.color}
          opacity={prop.opacity}
          strokeDasharray={prop.dash}
          strokeWidth={prop.strokeWidth}
        >
          {prop.prop.shape === "rect" ? (
            <rect
              ref={shapeRef as React.RefObject<SVGRectElement>}
              data-testid={prop.id}
              className={`z-${prop.id}`}
              id={`${prop.id}`}
              rx={15}
              x={prop.prop.pos.x}
              y={prop.prop.pos.y}
              width={prop.prop.width}
              height={prop.prop.height}
            ></rect>
          ) : prop.prop.shape === "oval" ? (
            <circle
              cx={prop.prop.pos.x}
              cy={prop.prop.pos.y}
              r={prop.prop.radius}
              ref={shapeRef as React.RefObject<SVGCircleElement>}
            ></circle>
          ) : prop.prop.shape === "tri" ? (
            <path
              ref={shapeRef}
              d={`M ${prop.prop.pos.x} ${
                prop.prop.pos.y + prop.prop.height
              } L ${prop.prop.startPos.x} ${prop.prop.pos.y} L ${
                prop.prop.pos.x + prop.prop.width
              } ${prop.prop.pos.y + prop.prop.height} z`}
            ></path>
          ) : null}
          {prop.hovered && prop.prop.shape !== "tri" && (
            <rect
              id={`${prop.id}`}
              rx={15}
              x={location[prop.id].x}
              y={location[prop.id].y}
              width={location[prop.id].width}
              height={location[prop.id].height}
              stroke={"green"}
              fillOpacity={prop.fill}
              fill={"none"}
              opacity={prop.opacity}
              strokeDasharray={prop.dash}
              strokeWidth={1.5}
              className={`z-${prop.id}`}
              data-testid={`hovered-${prop.id}`}
            ></rect>
          )}
        </g>
      </svg>
      {prop.highlight && prop.opacity !== 0 && (
        <CompOverlay
          id={prop.id}
          opacity={prop.opacity}
          type={"shape"}
          drawing={prop}
        />
      )}
    </>
  );
}
