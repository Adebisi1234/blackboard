export interface ArrowHeadProp
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  x: number;
  y: number;
  angle: number;
  color: string;
  strokeWidth: number;
}
export function ArrowHead({
  angle,
  x,
  y,
  color,
  strokeWidth,
  id,
}: ArrowHeadProp) {
  return (
    <path
      d={`M ${x} ${y + 5} L ${x - 5} ${y - 5} M ${x} ${y + 5} L ${x + 5} ${
        y - 5
      }`}
      style={{
        transformBox: "stroke-box",
        transformOrigin: "center",
        rotate: `${angle - 90}deg`,
        zIndex: 20,
      }}
      fill="none"
      fillOpacity={0}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      id={`${id}`}
    ></path>
  );
}
