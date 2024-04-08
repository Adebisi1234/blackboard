import { useEffect, useRef, useState } from "react";
import { Drawings } from "../../types/general";
import { useActiveTool, useDrawing, useLocation } from "../../store/Store";
import CompOverlay from "../ui/CompOverlay";
import { produce } from "immer";
import useWindowSize from "../../hooks/useWindowSize";

export default function Note(prop: Drawings<"note">[0]) {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const setLocation = useLocation((state) => state.setLocation);
  const { activeTool, setActiveTool } = useActiveTool();
  const [edit, setEdit] = useState(true);
  const [moveComp, setMoveComp] = useState(false);
  const windowWidth = useWindowSize();
  if (edit) {
    textRef.current?.focus();
  }
  const { getDrawing, updateDrawing } = useDrawing();
  const drawing = getDrawing();
  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height, x, y } = containerRef.current
      ?.getBoundingClientRect()
      .toJSON();
    setLocation({
      width,
      height,
      x: (prop.pos.x ?? x) - width / 2,
      y: (prop.pos.y ?? y) - height / 2,
      id: prop.id,
    });
  }, [
    containerRef.current?.offsetWidth,
    containerRef.current?.offsetHeight,
    prop.pos,
    windowWidth,
  ]);
  return (
    <>
      <div
        className={`z-${prop.id} -translate-x-1/2 -translate-y-1/2 min-h-[200px] w-[200px] max-w-[200px] rounded-lg h-fit relative flex justify-center items-center  p-1`}
        style={{
          left: `${prop.pos.x}px`,
          top: `${prop.pos.y}px`,
          backgroundColor: `${
            prop.color === "#ffffff" ? "#333438" : prop.color
          }`,
          opacity: prop.opacity,
          fontSize: prop.font,
        }}
        onPointerDown={(ev) => {
          ev.stopPropagation();
          activeTool === "hand" && setMoveComp(true);
        }}
        onPointerMove={(ev) => {
          ev.stopPropagation();
          if (!moveComp) return;

          const edit = produce(prop, (draft) => {
            draft.pos.x = (draft.pos.x ?? 0) + ev.movementX;
            draft.pos.y = (draft.pos.y ?? 0) + ev.movementY;
          });
          updateDrawing(prop.id, edit);
        }}
        onPointerUp={() => {
          moveComp && setMoveComp(false);
        }}
        onPointerLeave={() => {
          moveComp && setMoveComp(false);
          setEdit(false);
        }}
        id={`${prop.id}`}
        onDoubleClick={() => {
          edit !== true && setEdit(true);
          textRef.current?.focus();
        }}
      >
        <div
          className={`border rounded-md flex items-center justify-center static w-full min-h-[200px] h-fit ${
            prop.hovered && "border-green-500"
          }`}
          id={`${prop.id}`}
          ref={containerRef}
        >
          <div
            className={`static min-w-10 min-h-full size-fit max-w-full break-words text-center whitespace-pre-wrap`}
            id={`${prop.id}`}
          >
            {!edit ? prop.prop.value : ""}

            <textarea
              name={`${prop.id}`}
              id={`${prop.id}`}
              ref={textRef}
              onKeyDown={(e) => {
                if (!textRef.current) return;
                if (e.key === "Backspace") {
                  textRef.current.style.height = `${prop.font}px`; //I literally don't know why this works don't touch
                }
              }}
              onInput={(e) => {
                if (!textRef.current) return;
                textRef.current.style.height = `${textRef.current?.scrollHeight}px`;
                let edit = {
                  ...drawing[prop.id],
                  prop: { ...prop.prop, value: e.currentTarget.value },
                };
                updateDrawing(prop.id, edit);
              }}
              value={prop.prop.value}
              className={`border-none outline-none bg-transparent overflow-clip min-w-10 size-fit max-w-full text-center ${
                !edit && "hidden"
              }`}
            ></textarea>
          </div>
        </div>
      </div>
      {prop.highlight && prop.opacity !== 0 && (
        <CompOverlay id={prop.id} opacity={prop.opacity} type={"text"} />
      )}
    </>
  );
}
