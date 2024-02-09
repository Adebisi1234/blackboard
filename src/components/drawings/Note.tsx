import React, { useRef } from "react";

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
};
export default React.forwardRef<HTMLDivElement, NoteProp>(function Note(
  { color, id, pos, opacity, highlight = false, font }: NoteProp,
  activeCompRef
) {
  const textRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div
      ref={activeCompRef}
      className={`-translate-x-1/2 -translate-y-1/2  p-8 w-fit relative flex justify-center items-center z-10`}
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        backgroundColor: `green`,
        opacity: opacity,
        fontSize: font,
      }}
      id={`${id}`}
    >
      <textarea
        name={`${id}`}
        id={`${id}`}
        ref={textRef}
        onInput={() => {
          if (!textRef.current) return;
          textRef.current.style.height = `${textRef.current?.scrollHeight}px`;
          textRef.current.style.width = `${textRef.current?.scrollWidth}px`;
        }}
        className="bg-inherit outline-none border-none overflow-clip"
      ></textarea>
    </div>
  );
});
