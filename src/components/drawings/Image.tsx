import { useEffect, useMemo, useRef, useState } from "react";
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
  const [windowWidth, windowHeight] = useWindowSize();
  const [moveComp, setMoveComp] = useState(false);
  const { activeTool, setActiveTool } = useActiveTool();
  const updateDrawing = useDrawing((state) => state.updateDrawing);
  const canvasPos = useCanvas((s) => s.canvasPos);
  const imgSrc = useMemo(() => src, []);
  useEffect(() => {
    if (!imgRef.current) return;
    setLocation({
      x,
      y,
      width,
      height,
      id: prop.id,
    });
  }, [width, height, prop.prop, canvasPos, windowWidth, windowHeight, imgRef]);
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
        onPointerDown={() => {
          activeTool === "hand" && setMoveComp(true);
        }}
        onDoubleClick={() => {
          setActiveTool("hand");
          setMoveComp(true);
        }}
        onPointerMove={(ev) => {
          if (!moveComp) return;
          ev.bubbled = true;
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
          src={imgSrc}
          ref={imgRef}
          alt={alt}
          id={`${prop.id}`}
          className={`object-contain z-${prop.id}`}
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
