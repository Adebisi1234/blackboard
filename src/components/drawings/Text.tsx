import React, {
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useLocationDispatch } from "../../context/StateContext";
import { Drawings, type TextProp } from "../../types/general";
import { useDrawing } from "../../store/Store";

export default React.forwardRef<HTMLDivElement, Drawings<"text">[0]>(
  function Text(prop, activeCompRef) {
    const textRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(
      activeCompRef,
      () => {
        return containerRef.current!;
      },
      []
    );
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
        id={`${prop.id}`}
        ref={containerRef}
        onInput={() => {
          if (!textRef.current) return;
          textRef.current.style.height = `${textRef.current?.scrollHeight}px`;
          textRef.current.style.width = `${textRef.current?.scrollWidth}px`;
        }}
        onMouseOver={() => {
          setHovered(true);
        }}
        onClick={() => {
          console.log("clicked");
          edit !== true && setEdit(true);
        }}
        onMouseLeave={() => {
          setEdit(false);
          setHovered(false);
        }}
        className={`bg-inherit absolute outline-none border-none overflow-clip -translate-x-1/2 -translate-y-1/2 text-lg z-10 break-words text-pretty whitespace-pre-wrap ${
          (prop.highlight || hovered) && "border-green-500"
        }`}
        style={{
          left: `${prop.pos.x}px`,
          top: `${prop.pos.y}px`,
          backgroundColor: `transparent`,
          opacity: prop.opacity,
          fontSize: prop.font,
        }}
      >
        {!edit ? prop.prop.value : ""}
        <textarea
          name={`${prop.id}`}
          id={`${prop.id}`}
          ref={textRef as RefObject<HTMLTextAreaElement>}
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
          className={`border-none outline-none bg-transparent overflow-clip min-w-10 size-fit max-w-full text-[${
            prop.color
          }] ${!edit && "hidden"}`}
          placeholder="Enter your text"
        ></textarea>
      </div>
    );
  }
);
