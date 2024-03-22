import React, {
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Drawings } from "../../types/general";
import { useDrawing, useLocation } from "../../store/Store";
import CompOverlay from "../ui/CompOverlay";

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
    const [edit, setEdit] = useState(true);
    const setLocation = useLocation((state) => state.setLocation);
    if (edit) {
      textRef.current?.focus();
    }
    const { drawing, updateDrawing } = useDrawing();
    useEffect(() => {
      const { width, height, x, y } = containerRef.current
        ?.getBoundingClientRect()
        .toJSON();
      setLocation({
        width,
        height,
        x,
        y,
        id: prop.id,
      });
    }, [containerRef.current?.offsetWidth, containerRef.current?.offsetHeight]);

    return (
      <>
        <div
          id={`${prop.id}`}
          ref={containerRef}
          onInput={() => {
            if (!textRef.current) return;
            textRef.current.style.height = `${textRef.current?.scrollHeight}px`;
            textRef.current.style.width = `${textRef.current?.scrollWidth}px`;
          }}
          onClick={() => {
            edit !== true && setEdit(true);
          }}
          onMouseLeave={() => {
            setEdit(false);
          }}
          className={`bg-inherit absolute outline-none border-none overflow-clip -translate-x-1/2 -translate-y-1/2 text-lg z-10 break-words text-pretty whitespace-pre-wrap ${
            prop.hovered && "border-green-500"
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
            className={`border-none outline-none text-center bg-transparent overflow-clip min-w-10 size-fit max-w-full text-[${
              prop.color
            }] ${!edit && "hidden"}`}
            placeholder="Enter your text"
          ></textarea>
        </div>
        {prop.highlight && prop.opacity !== 0 && (
          <CompOverlay id={prop.id} opacity={prop.opacity} type={"others"} />
        )}
      </>
    );
  }
);
