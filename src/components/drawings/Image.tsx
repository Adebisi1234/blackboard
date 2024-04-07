import { useEffect, useRef, useState } from "react";
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

export default function Image(prop: Drawings<"image">[0]) {
  const { src, alt, width, height, x, y } = prop.prop;
  const imgRef = useRef<HTMLImageElement>(null);
  const setLocation = useLocation((state) => state.setLocation);
  const windowWidth = useWindowSize();
  const [moveComp, setMoveComp] = useState(false);
  const { activeTool, setActiveTool } = useActiveTool();
  const updateDrawing = useDrawing((state) => state.updateDrawing);
  const canvasPos = useCanvas((s) => s.canvasPos);
  useEffect(() => {
    if (!imgRef.current) return;
    const { x, y } = imgRef.current?.getBoundingClientRect();
    setLocation({
      x,
      y,
      width,
      height,
      id: prop.id,
    });
  }, [width, height, prop.prop, canvasPos, windowWidth]);
  return (
    <>
      <div
        draggable={false}
        id={`${prop.id}`}
        style={{
          left: x,
          top: y,
          width: width,
          height,
          opacity: prop.opacity,
        }}
        onPointerDown={(ev) => {
          ev.stopPropagation();
          activeTool === "hand" && setMoveComp(true);
        }}
        onDoubleClick={() => {
          setActiveTool("hand");
          setMoveComp(true);
        }}
        onPointerMove={(ev) => {
          ev.stopPropagation();
          if (!moveComp) return;
          const edit = produce(prop, (draft) => {
            draft.prop.x += ev.movementX;
            draft.prop.y += ev.movementY;
          });
          updateDrawing(prop.id, edit);
        }}
        onPointerUp={() => {
          moveComp && setMoveComp(false);
        }}
        onPointerLeave={() => {
          moveComp && setMoveComp(false);
        }}
      >
        <img
          src={src}
          ref={imgRef}
          alt={alt}
          id={`${prop.id}`}
          className="object-contain "
          draggable={false}
          style={{
            width,
            height,
          }}
        />
      </div>
      {prop.highlight && prop.opacity !== 0 && (
        <CompOverlay id={prop.id} type={"image"} opacity={prop.opacity!} />
      )}
    </>
  );
}
