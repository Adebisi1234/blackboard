import { useRef } from "react";
import { useDrawing } from "../Canvas";
import { useLocation } from "../../context/StateContext";
import { Drawings } from "../../types/general";

type Prop = { translateX: number; translateY: number };
type Rect = { x: number; y: number; w: number; h: number };
export default function Minimap({ translateX, translateY }: Prop) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useDrawing();
  const location = useLocation();
  const prevLocation = useRef(location);
  const renderArr = useRef<Drawings>([]);
  const ctx = canvasRef.current?.getContext("2d");
  console.log(translateX, translateY);
  const canvasRect = useRef<Rect>({
    x: (translateX / innerWidth) * 200,
    y: (translateY / innerHeight) * 150,
    h: 150,
    w: 200,
  });

  if (prevLocation.current !== location) {
    console.log(location);
    prevLocation.current = location;
    renderArr.current = [];
    prevLocation.current.map(({ id }) => {
      renderArr.current.push(drawing[id]);
    });
    render(ctx, renderArr.current, canvasRect.current);
  }

  return <canvas width={200} height={150} ref={canvasRef}></canvas>;
}

function render(
  ctx: CanvasRenderingContext2D | null | undefined,
  drawings: Drawings,
  canvasRect: Rect
) {
  if (!ctx) {
    return;
  }
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#333438";
  console.log(canvasRect);
  ctx.fillRect(canvasRect.x, canvasRect.y, canvasRect.w, canvasRect.h);
  drawings.forEach((drawing) => {
    switch (drawing.type) {
      case "arrow": {
        // generate the code that creates a representation of the arrow in the canvas
        const x1 = (drawing.startPos.x / innerWidth) * 200;
        const y1 = (drawing.startPos.y / innerHeight) * 150;
        const x2 = (drawing.endPos.x / innerWidth) * 200;
        const y2 = (drawing.endPos.y / innerHeight) * 150;
        if (ctx) {
          ctx.strokeStyle = "rgb(255,255,255)";
        }
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

function clearRender(ctx: CanvasRenderingContext2D | null | undefined) {
  ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// x = (x / innerWidth) * 200; //Working on ratio first trial
// width = (width / innerWidth) * 200; //Working on ratio first trial
// y = (y / innerHeight) * 150;
// height = (height / innerHeight) * 150;
// if (!ctx) {
//   console.log("wtf");
//   return;
// }
// ctx.strokeStyle = "rgb(255,255,255)";
// ctx.strokeRect(x, y, width, height);
