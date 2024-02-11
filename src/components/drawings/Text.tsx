import React, {
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDrawingDispatch } from "../Canvas";
import { useLocationDispatch } from "../../context/StateContext";

export type TextProp = {
  id: number;
  color: string;
  pos: {
    x: number;
    y: number;
  };
  opacity: number;
  highlight?: boolean;
  type: "text";
  font: number;
  value?: string;
};
export default React.forwardRef<HTMLDivElement, TextProp>(function Text(
  { id, color, pos, opacity, highlight = false, font, value }: TextProp,
  activeCompRef
) {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(
    activeCompRef,
    () => {
      return containerRef.current!;
    },
    []
  );
  const setDrawing = useDrawingDispatch();
  const [hovered, setHovered] = useState(false);
  const [edit, setEdit] = useState(true);
  const dispatch = useLocationDispatch();
  if (edit) {
    textRef.current?.focus();
  }

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
  return (
    <div
      id={`${id}`}
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
        (highlight || hovered) && "border-green-500"
      }`}
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        backgroundColor: `transparent`,
        opacity: opacity,
        fontSize: font,
      }}
    >
      {!edit ? value : ""}
      <textarea
        name={`${id}`}
        id={`${id}`}
        ref={textRef as RefObject<HTMLTextAreaElement>}
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
            } as TextProp;
            return temp;
          });
        }}
        value={value}
        className={`border-none outline-none bg-transparent overflow-clip min-w-10 size-fit max-w-full text-[${color}] ${
          !edit && "hidden"
        }`}
        placeholder="Enter your text"
      ></textarea>
    </div>
  );
});
