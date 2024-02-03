export type PointerProp = {
  pos: {
    x: number;
    y: number;
  };
  startPos: {
    x: number;
    y: number;
  };
  strokeWidth: number;
  width: number;
  height: number;
  highlight?: boolean;
  type: "pointer";
  id: number;
};

export default function Pointer({
  width,
  height,
  pos,
  strokeWidth = 3,
  highlight = true,
  id,
}: PointerProp) {
  return (
    <>
      {highlight && (
        <svg id={`${id}`} className="w-full h-full">
          <rect
            width={width}
            height={height}
            x={pos.x}
            y={pos.y}
            strokeWidth={strokeWidth}
            stroke="#fff"
          ></rect>
        </svg>
      )}
    </>
  );
}