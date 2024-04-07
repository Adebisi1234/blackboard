import { useEffect, useRef, useState } from "react";
import { Drawings } from "../../types/general";
import CompOverlay from "../ui/CompOverlay";
import { useActiveTool, useDrawing, useLocation } from "../../store/Store";
import { produce } from "immer";
import useWindowSize from "../../hooks/useWindowSize";

export default function Shapes(prop: Drawings<"shape">[0]) {
  const rectRef = useRef<SVGRectElement>(null);
  const setLocation = useLocation((state) => state.setLocation);
  const [moveComp, setMoveComp] = useState(false);
  const { activeTool, setActiveTool } = useActiveTool();
  const windowWidth = useWindowSize();
  const updateDrawing = useDrawing((s) => s.updateDrawing);
  useEffect(() => {
    if (!rectRef.current) return;
    const { x, y } = prop.prop.pos;
    const { width, height } = prop.prop;

    setLocation({
      x,
      y,
      width,
      height,
      id: prop.id,
    });
  }, [prop.prop.width, prop.prop.height, prop.prop.pos, windowWidth]);
  return (
    <>
      <svg id={`${prop.id}`}>
        <rect
          ref={rectRef}
          onPointerDown={(ev) => {
            ev.stopPropagation();
            activeTool === "hand" && setMoveComp(true);
          }}
          onPointerMove={(ev) => {
            ev.stopPropagation();
            if (!moveComp) return;

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
          id={`${prop.id}`}
          rx={15}
          x={prop.prop.pos.x}
          y={prop.prop.pos.y}
          width={prop.prop.width}
          height={prop.prop.height}
          stroke={prop.color}
          fillOpacity={prop.fill}
          fill={prop.color}
          opacity={prop.opacity}
          strokeDasharray={prop.dash}
          strokeWidth={prop.strokeWidth}
        ></rect>
        {prop.hovered && (
          <rect
            id={`${prop.id}`}
            rx={15}
            x={prop.prop.pos.x}
            y={prop.prop.pos.y}
            width={prop.prop.width}
            height={prop.prop.height}
            stroke={"green"}
            fillOpacity={prop.fill}
            fill={"none"}
            opacity={prop.opacity}
            strokeDasharray={prop.dash}
            strokeWidth={1.5}
          ></rect>
        )}
      </svg>
      {prop.highlight && prop.opacity !== 0 && (
        <CompOverlay id={prop.id} opacity={prop.opacity} type={"shape"} />
      )}
    </>
  );
}
