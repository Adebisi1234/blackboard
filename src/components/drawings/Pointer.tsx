import { useEffect, useState } from "react";
import { useLocation } from "../../context/StateContext";
import { useHighlighted } from "../Canvas";
import { Location } from "../../types/general";

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
  highlight = true,
  id,
}: PointerProp) {
  const location = useLocation();

  const setHighlighted = useHighlighted();
  useEffect(() => {
    setHighlighted(CompInRange(location, pos, width, height));
    return () => setHighlighted([]);
  }, [width, height, pos]);

  console.log(pos);
  return (
    <>
      {highlight && (
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
  pos: PointerProp["pos"],
  width: number,
  height: number
): number[] {
  const xLowerLimit = pos.x;
  const xUpperLimit = pos.x + width;
  const yLowerLimit = pos.y;
  const yUpperLimit = pos.y + height;

  // So basically we'll check if any position in the location state is inside or contains the pointer range limits

  return location.map((v) => {
    if (!v) return -1;
    if (
      v.x > xLowerLimit &&
      v.y > yLowerLimit &&
      v.x + v.width < xUpperLimit &&
      v.y + v.height < yUpperLimit
    ) {
      return v.id;
    }
    return -1;
  });
}
