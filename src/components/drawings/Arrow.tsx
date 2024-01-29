type Prop = {
  id: string;
  color: string;
  // Curve to
  startPos: {
    x: number;
    y: number;
  };
  endPos: {
    x: number;
    y: number;
  };
  opacity: number;
  strokeWidth: number;
};

export default function Arrow({
  startPos,
  endPos,
  id,
  color,
  opacity,
  strokeWidth = 3,
}: Prop) {
  return (
    <svg id={id} opacity={opacity}>
      <path
        d={`M ${startPos.x} ${startPos.y} L ${endPos.x} ${endPos.y}`}
        stroke={color}
        strokeWidth={strokeWidth}
      ></path>
      {/* Arrow head */}
    </svg>
  );
}
