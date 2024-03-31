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

export default function Image(prop: Drawings<"image">[0]) {
  const { src, alt, width, height, x, y } = prop.prop;
  const imgRef = useRef<HTMLImageElement>(null);
  const setLocation = useLocation((state) => state.setLocation);
  const [moveComp, setMoveComp] = useState(false);
  const activeTool = useActiveTool((state) => state.activeTool);
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
  }, [width, height, prop.prop, canvasPos]);
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
        onMouseDown={(ev) => {
          ev.stopPropagation();
          activeTool === "hand" && setMoveComp(true);
        }}
        onMouseMove={(ev) => {
          ev.stopPropagation();
          if (!moveComp) return;
          console.log("moving");
          const edit = produce(prop, (draft) => {
            draft.prop.x += ev.movementX;
            draft.prop.y += ev.movementY;
          });
          updateDrawing(prop.id, edit);
        }}
        onMouseUp={(ev) => {
          setMoveComp(false);
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
