export function getDiff(prev: number, curr: number) {
  return Math.abs(curr - prev);
}

export function pythag({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  const x = getDiff(x1, x2);
  const y = getDiff(y1, y2);
  return Math.hypot(x, y);
}

export function getRelativeMin(v1: number, v2: number) {
  if (v1 < v2) {
    return v1;
  }
  return v2;
}
