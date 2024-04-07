import { useRef } from "react";
import { Drawings } from "../../types/general";
import { useCanvas, useDrawing, useLocation } from "../../store/Store";

export default function Minimap() {
  const minWidth = innerWidth,
    minHeight = innerHeight;
  const { x, y } = useCanvas((state) => state.canvasPos);
  const minX = 0 - x;
  const minY = 0 - y;
  const totalWidth = innerWidth + Math.abs(x);
  const totalHeight = innerHeight + Math.abs(y);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useDrawing((state) => state.getDrawing());
  const Loc = useLocation((state) => state.location);
  const renderArr = useRef<Drawings>([]);
  const ctx = canvasRef.current?.getContext("2d");
  const animate = () => {
    renderArr.current = [];
    for (const id in Loc) {
      if (Object.prototype.hasOwnProperty.call(Loc, id)) {
        renderArr.current.push(drawing[id]);
      }
    }

    render({
      ctx,
      drawings: renderArr.current,
      minX,
      minY,
      minHeight,
      minWidth,
      totalHeight,
      totalWidth,
    });
  };
  setTimeout(
    () =>
      render({
        ctx: (
          document.getElementById("miniCanvas") as HTMLCanvasElement
        ).getContext("2d"),
        drawings: renderArr.current,
        minX,
        minY,
        minHeight,
        minWidth,
        totalHeight,
        totalWidth,
      }),
    0
  ); // Render after ctx is ready
  requestAnimationFrame(animate);

  return (
    <canvas width={200} height={150} ref={canvasRef} id="miniCanvas"></canvas>
  );
}
type RenderProp = {
  ctx: CanvasRenderingContext2D | null | undefined;
  drawings: Drawings;
  minX: number;
  minY: number;
  minWidth: number;
  minHeight: number;
  totalWidth: number;
  totalHeight: number;
};
function render({
  ctx,
  drawings,
  minX,
  minY,
  minWidth,
  minHeight,
  totalWidth,
  totalHeight,
}: RenderProp) {
  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#333438";

  ctx.fillRect(minX, minY, minWidth, minHeight);
  drawings.forEach((drawing) => {
    switch (drawing.prop.type) {
      case "arrow": {
        // generate the code that creates a representation of the arrow in the canvas
        const x1 = (drawing.prop.startPos.x / totalWidth) * 200;
        const y1 = (drawing.prop.startPos.y / totalHeight) * 150;
        const x2 = (drawing.prop.endPos.x / totalWidth) * 200;
        const y2 = (drawing.prop.endPos.y / totalHeight) * 150;
        ctx.strokeStyle = "rgb(255,255,255)";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.moveTo(0, 0);
        ctx.stroke();
        break;
      }
      case "image": {
        // Create a representation of the image in the canvas

        break;
      }
      case "note": {
        break;
      }
      case "pencil": {
        break;
      }
      case "pointer": {
        break;
      }
      case "text": {
        break;
      }
      case "shape": {
        break;
      }
    }
  });
}

/* 

The absolute bg is the whole width
Then The Highlighted is the context showing


*/
