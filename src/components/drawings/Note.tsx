import React, { useEffect, useRef, useState } from "react";
import { useLocationDispatch } from "../../context/StateContext";
import { useDrawingDispatch } from "../Canvas";
// import { useActiveTool } from "../Canvas";
// import { ActiveTool } from "../../App";

export type NoteProp = {
  color: string;
  id: number;
  pos: {
    x: number;
    y: number;
  };
  opacity: number;
  highlight?: boolean;
  type: "note";
  font: number;
  value?: string;
};
export default React.forwardRef<HTMLDivElement, NoteProp>(function Note(
  { color, id, pos, opacity, highlight = false, font, value }: NoteProp,
  activeCompRef
) {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useLocationDispatch();
  const [hovered, setHovered] = useState(false);
  const [edit, setEdit] = useState(true);
  const setDrawing = useDrawingDispatch();
  useEffect(() => {
    dispatch({
      id,
      loc: {
        id,
        x: pos.x,
        y: pos.y,
        width: containerRef.current?.getBoundingClientRect().width ?? 0,
        height: containerRef.current?.getBoundingClientRect().height ?? 0,
      },
    });
  }, [
    pos,
    containerRef.current?.offsetWidth,
    containerRef.current?.offsetHeight,
  ]);
  if (edit) {
    textRef.current?.focus();
  }
  return (
    <div
      ref={activeCompRef}
      className={`-translate-x-1/2 -translate-y-1/2 min-h-[200px] w-[200px] max-w-[200px] rounded-lg h-fit relative flex justify-center items-center z-10 p-1`}
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        backgroundColor: `${color === "#ffffff" ? "#333438" : color}`,
        opacity: opacity,
        fontSize: font,
      }}
      id={`${id}`}
      onMouseOver={() => {
        setHovered(true);
      }}
      onDoubleClick={() => {
        console.log("clicked");
        edit !== true && setEdit(true);
      }}
      onMouseLeave={() => {
        setEdit(false);
        setHovered(false);
      }}
    >
      <div
        className={`border rounded-md flex items-center justify-center static w-full min-h-[200px] h-fit ${
          (highlight || hovered) && "border-green-500"
        }`}
        onMouseOver={() => {
          setHovered(true);
        }}
        id={`${id}`}
        ref={containerRef}
      >
        <div
          className={`static min-w-10 min-h-full size-fit max-w-full break-words text-center whitespace-pre-wrap`}
          onMouseOver={() => {
            setHovered(true);
          }}
          id={`${id}`}
        >
          {!edit ? value : ""}

          <textarea
            onMouseOver={() => {
              setHovered(true);
            }}
            name={`${id}`}
            id={`${id}`}
            ref={textRef}
            onKeyDown={(e) => {
              if (!textRef.current) return;
              if (e.key === "Backspace") {
                textRef.current.style.height = `${font}px`; //I literally don't know why this works don't touch
              }
            }}
            onInput={(e) => {
              if (!textRef.current) return;
              textRef.current.style.height = `${textRef.current?.scrollHeight}px`;
              let value = e.currentTarget.value;
              setDrawing((prev) => {
                const temp = [...prev];
                temp[id] = {
                  ...temp[id],
                  value,
                } as NoteProp;
                return temp;
              });
            }}
            value={value}
            className={`border-none outline-none bg-transparent overflow-clip min-w-10 size-fit max-w-full text-center ${
              !edit && "hidden"
            }`}
          ></textarea>
        </div>
      </div>
    </div>
  );
});
