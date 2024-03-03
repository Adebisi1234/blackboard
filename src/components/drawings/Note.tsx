import React, { useEffect, useRef, useState } from "react";
import { Drawings } from "../../types/general";
import { useDrawing } from "../../store/Store";

export default React.forwardRef<HTMLDivElement, Drawings<"note">[0]>(
  function Note(prop, activeCompRef) {
    const textRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const [edit, setEdit] = useState(true);
    if (edit) {
      textRef.current?.focus();
    }
    const { drawing, updateDrawing } = useDrawing();
    // useEffect(() => {
    //   let edit = {
    //     ...drawing[prop.id],
    //     location: {
    //       ...prop.location,
    //       width: containerRef.current?.offsetWidth,
    //       height: containerRef.current?.offsetHeight,
    //     },
    //   };
    //   updateDrawing(prop.id, edit);
    // }, [containerRef.current?.offsetWidth, containerRef.current?.offsetHeight]);
    return (
      <div
        ref={activeCompRef}
        className={`-translate-x-1/2 -translate-y-1/2 min-h-[200px] w-[200px] max-w-[200px] rounded-lg h-fit relative flex justify-center items-center z-10 p-1`}
        style={{
          left: `${prop.pos.x}px`,
          top: `${prop.pos.y}px`,
          backgroundColor: `${
            prop.color === "#ffffff" ? "#333438" : prop.color
          }`,
          opacity: prop.opacity,
          fontSize: prop.font,
        }}
        id={`${prop.id}`}
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
            (prop.highlight || hovered) && "border-green-500"
          }`}
          onMouseOver={() => {
            setHovered(true);
          }}
          id={`${prop.id}`}
          ref={containerRef}
        >
          <div
            className={`static min-w-10 min-h-full size-fit max-w-full break-words text-center whitespace-pre-wrap`}
            onMouseOver={() => {
              setHovered(true);
            }}
            id={`${prop.id}`}
          >
            {!edit ? prop.prop.value : ""}

            <textarea
              onMouseOver={() => {
                setHovered(true);
              }}
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
    );
  }
);
