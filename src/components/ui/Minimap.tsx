import { useCallback, useEffect, useRef } from "react";
import { useCanvas, useDrawing, useLocation } from "../../store/Store";
import useWindowSize from "../../hooks/useWindowSize";
import { Drawings, Location } from "../../types/general";

export default function Minimap() {
  const drawing = useDrawing((s) => s.getDrawing());
  const loc = useLocation((s) => s.location);
  const canvasPos = useCanvas((s) => s.canvasPos);
  const windowWidth = useWindowSize();
  const change = useRef({
    dx: 0,
    dy: 0,
  });

  if (Math.abs(canvasPos.x) > change.current.dx) {
    change.current.dx = Math.abs(canvasPos.x);
  }
  if (Math.abs(canvasPos.y) > change.current.dy) {
    change.current.dy = Math.abs(canvasPos.y);
  }

  const mapSize = {
    width: 200,
    height: 150,
  };
  const mapRatio = {
    x: mapSize.width / (windowWidth + change.current.dx),
    y: mapSize.height / (innerHeight + change.current.dy),
  };

  const screenPos = {
    x: -canvasPos.x * mapRatio.x,
    y: -canvasPos.y * mapRatio.y,
    width: mapRatio.x * windowWidth,
    height: mapRatio.y * innerHeight,
  };

  const minimapRef = useRef<HTMLCanvasElement>(null);
  const ctx = minimapRef.current?.getContext("2d");

  const renderMovingCanvas = useCallback(() => {
    if (!ctx) return;
    ctx.clearRect(0, 0, mapSize.width, mapSize.height);
    ctx.strokeStyle = "red";
    ctx.fillStyle = "#333438";
    ctx.roundRect(0, 0, mapSize.width, mapSize.height, 15);
    ctx.fillRect(screenPos.x, screenPos.y, screenPos.width, screenPos.height);
    ctx.stroke();
  }, [mapSize, screenPos, ctx]);

  useEffect(() => {
    renderMovingCanvas();
  }, [canvasPos]); // Moving minimap

  useEffect(() => {
    if (!ctx) return;
    ctx.clearRect(0, 0, mapSize.width, mapSize.height);
    renderMovingCanvas();
    for (const id in loc) {
      if (Object.prototype.hasOwnProperty.call(loc, id)) {
        renderComp({
          comp: drawing[id],
          loc: loc[id],
          ctx,
          mapRatio,
          screenPos,
        });
      }
    }
  }, [loc]); //Drawing components

  return (
    <canvas width={200} height={150} ref={minimapRef} id="miniCanvas"></canvas>
  );
}

function renderComp({
  comp,
  loc,
  ctx,
  mapRatio,
  screenPos,
}: {
  comp: Drawings[0];
  loc: Location;
  ctx: CanvasRenderingContext2D;
  mapRatio: { x: number; y: number };
  screenPos: { x: number; y: number };
}) {
  switch (comp.prop.type) {
    case "image":
    case "note":
    case "text": {
      let { x, y } = comp.pos;
      let { width, height } = loc;
      x *= mapRatio.x;
      x -= screenPos.x; //Accounting for canvas translating
      width *= mapRatio.x;
      y *= mapRatio.x;
      y -= screenPos.y;
      height *= mapRatio.x;
      // Generate random color
      ctx.fillStyle = "blue";
      ctx.fillRect(x, y, width, height);
      ctx.stroke();
      break;
    }
    case "pencil": {
      let { width, height, x, y } = loc;
      x *= mapRatio.x;
      x += screenPos.x; //Accounting for canvas translating
      width *= mapRatio.x;
      y *= mapRatio.x;
      y += screenPos.y;
      height *= mapRatio.x;
      // Generate random color
      ctx.fillStyle = "blue";
      ctx.fillRect(x, y, width, height);
      ctx.stroke();

      break;
    }
    case "arrow":
      let { startPos, endPos, qCurve } = comp.prop; // Immutable :(
      startPos = {
        x: startPos.x * mapRatio.x,
        y: startPos.y * mapRatio.y,
      };
      endPos = {
        x: endPos.x * mapRatio.x,
        y: endPos.y * mapRatio.y,
      };

      // Generate random color
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.moveTo(startPos.x, startPos.y);
      if (qCurve) {
        qCurve = {
          x: qCurve.x * mapRatio.x,
          y: qCurve.y * mapRatio.y,
        };
        ctx.quadraticCurveTo(qCurve.x, qCurve.y, endPos.x, endPos.y);
        ctx.moveTo(0, 0);
        ctx.closePath();
        ctx.stroke();
        return;
      }
      ctx.lineTo(endPos.x, endPos.y);
      ctx.moveTo(0, 0);
      ctx.stroke();
      break;
    case "pointer":
    case "shape": {
      let { x, y, width, height } = loc;

      x *= mapRatio.x;
      width *= mapRatio.x;
      y *= mapRatio.x;
      height *= mapRatio.x;
      // Generate random color
      ctx.strokeStyle = "blue";
      ctx.strokeRect(x, y, width, height);
      ctx.stroke();
      break;
    }
  }
}
