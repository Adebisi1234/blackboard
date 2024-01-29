type Prop = {
  color: string;
  id: string;
  path: {
    func: "M" | "L";
    x: number;
    y: number;
  }[];
  opacity: number;
  strokeWidth: number;
  scale: number;
  dash: string;
};
export default function Pencil({
  color,
  id,
  path,
  opacity,
  scale = 1,
  strokeWidth = 3,
  dash,
}: Prop) {
  const d = path
    .map(({ func, x, y }) => {
      return `${func} ${x * scale} ${y * scale}`;
    })
    .join(" ");
  return (
    <svg id={id} opacity={opacity}>
      <path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dash}
      ></path>
    </svg>
  );
}
// For changing size just multiply each point by the diff and add
