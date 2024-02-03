import { useRef } from "react";

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
};
export default function Text({
  id,
  color,
  pos,
  opacity,
  highlight = false,
  font,
}: TextProp) {
  const textRef = useRef<HTMLTextAreaElement>(null);

  return (
    <textarea
      name={`${id}`}
      id={`${id}`}
      ref={textRef}
      onInput={() => {
        if (!textRef.current) return;
        textRef.current.style.height = `${textRef.current?.scrollHeight}px`;
        textRef.current.style.width = `${textRef.current?.scrollWidth}px`;
      }}
      className="bg-inherit absolute outline-none border-none overflow-clip -translate-x-1/2 -translate-y-1/2 text-lg z-10"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        backgroundColor: `green`,
        opacity: opacity,
        fontSize: font,
      }}
    ></textarea>
  );
}
