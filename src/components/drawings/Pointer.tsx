import { Drawings, Location } from "../../types/general";
import { useHighlighted, useLocation } from "../../store/Store";

export default function Pointer({ prop }: Drawings<"pointer">[0]) {
  const { pos, width, height } = prop;
  const location = useLocation((state) => state.location);
  const { setHighlighted, highlighted } = useHighlighted();

  if (
    highlighted.toString() !==
    CompInRange(location, pos, width, height).toString()
  ) {
    setHighlighted(CompInRange(location, pos, width, height));
  }

  return (
    <svg className="w-full h-full z-50">
      <g>
        <rect
          width={width}
          height={height}
          x={pos.x}
          y={pos.y}
          strokeWidth={1}
          stroke="#fff"
          fill="#333438"
          fillOpacity={0.3}
          className="z-50"
        ></rect>
      </g>
    </svg>
  );
}

export function CompInRange(
  location: { [key: number]: Location },
  pos: {
    x: number;
    y: number;
  },
  width: number,
  height: number
) {
  const xLowerLimit = pos.x;
  const xUpperLimit = pos.x + width;
  const yLowerLimit = pos.y;
  const yUpperLimit = pos.y + height;

  // So basically we'll check if any position in the location state is inside or contains the pointer range limits
  const range = [];
  for (const id in location) {
    if (Object.prototype.hasOwnProperty.call(location, id)) {
      const { x, y, width, height } = location[id];
      if (
        x > xLowerLimit &&
        y > yLowerLimit &&
        x + width < xUpperLimit &&
        y + height < yUpperLimit
      ) {
        range.push(+id);
      }
    }
  }
  return range;
}
