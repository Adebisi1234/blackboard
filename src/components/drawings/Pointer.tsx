import { useEffect } from "react";
import { Drawings, Location } from "../../types/general";
import { useHighlighted, useLocation } from "../../store/Store";

export default function Pointer({
  highlight,
  id,
  prop,
}: Drawings<"pointer">[0]) {
  const { pos, startPos, width, height } = prop;
  // const location = useLocation((state) => state.location);
  // const { setHighlighted } = useHighlighted();
  // useEffect(() => {
  //   setHighlighted(CompInRange(location, pos, width, height));
  //   return () => setHighlighted([]);
  // }, [width, height, pos]);

  return (
    <>
      {!highlight && (
        <svg id={`${id}`} className="w-full h-full">
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
            ></rect>
          </g>
        </svg>
      )}
    </>
  );
}

export function CompInRange(
  location: Location[],
  pos: Drawings<"pointer">[0]["prop"]["pos"],
  width: number,
  height: number
): number[] {
  const xLowerLimit = pos.x;
  const xUpperLimit = pos.x + width;
  const yLowerLimit = pos.y;
  const yUpperLimit = pos.y + height;

  // So basically we'll check if any position in the location state is inside or contains the pointer range limits

  return location.map(({ x, y, width, height, id }) => {
    if (
      x > xLowerLimit &&
      y > yLowerLimit &&
      x + width < xUpperLimit &&
      y + height < yUpperLimit
    ) {
      return id;
    }
    return -1;
  });
}
