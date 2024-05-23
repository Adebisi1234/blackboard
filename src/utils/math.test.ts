import { describe } from "vitest";
import { getDiff, getRelativeMin, pythag } from "./math";

describe(getDiff, () => {
  test("Test function implementation", () => {
    const a = 20;
    const b = 40;
    // Get absolute diff
    expect(getDiff(a, b)).toBe(20);
  });
});
describe(pythag, () => {
  test("Test function implementation", () => {
    const testPos = {
      x1: 5,
      x2: 10,
      y1: 5,
      y2: 10,
    };

    expect(pythag(testPos)).toBeCloseTo(Math.sqrt(50));
  });
});

describe(getRelativeMin, () => {
  test("Test function implementation", () => {
    let v1 = 20;
    let v2 = 30;
    expect(getRelativeMin(v1, v2)).toBe(v1);
  });
});
