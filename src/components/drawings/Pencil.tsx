export type PencilProp = {
  color: string;
  id: number;
  path: (
    | {
        func: "M";
        x: number;
        y: number;
      }
    | {
        func: "L";
        x: number;
        y: number;
      }
  )[];
  opacity: number;
  strokeWidth?: number;
  scale: number;
  dash: string;
  highlight?: boolean;
  type: "pencil";
};
export default function Pencil({
  color,
  id,
  path,
  opacity,
  scale = 1,
  strokeWidth = 3,
  highlight = false,
  dash,
}: PencilProp) {
  const d = path
    .map(({ func, x, y }) => {
      return `${func} ${x * scale} ${y * scale}`;
    })
    .join(" ");
  return (
    <svg id={`${id}`} opacity={opacity}>
      <path
        d={`${d} z`}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dash}
        fill="none"
      ></path>
    </svg>
  );
}
// For changing size just multiply each point by the diff and add
