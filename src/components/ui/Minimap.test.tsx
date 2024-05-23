import { render, screen } from "@testing-library/react";
// import { renderComp } from "./Minimap";

describe("renderComp", () => {
  test("renders the component with correct props", () => {
    const comp = {
      prop: {
        type: "image",
      },
      pos: {
        x: 10,
        y: 20,
      },
    };

    const loc = {
      x: 5,
      y: 10,
      width: 50,
      height: 100,
    };

    const ctx = document.createElement("canvas").getContext("2d");

    const mapRatio = {
      x: 2,
      y: 2,
    };

    const screenPos = {
      x: 0,
      y: 0,
    };

    const colors = {
      box: "red",
      pencil: "blue",
      arrow: "green",
      shape: "yellow",
    };

    // renderComp({ comp, loc, ctx, mapRatio, screenPos, colors });

    // Add your assertions here to verify the rendering
    // For example:
    // expect(ctx.fillStyle).toBe("red");
    // expect(ctx.fillRect).toHaveBeenCalledWith(10, 20, 100, 200);
  });
});
