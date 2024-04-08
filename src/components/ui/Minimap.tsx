import { useCallback, useEffect, useRef } from "react";
import { useCanvas, useDrawing, useLocation } from "../../store/Store";
import useWindowSize from "../../hooks/useWindowSize";
import { Drawings, Location } from "../../types/general";

export default function Minimap() {
  const drawing = useDrawing((s) => s.getDrawing());
  const loc = useLocation((s) => s.location);
  const canvasPos = useCanvas((s) => s.canvasPos);
  const windowWidth = useWindowSize();
  const changes = useRef<{
    lx: number;
    rx: number;
    ty: number;
    by: number;
    x: number;
    y: number;
  }>({
    lx: canvasPos.x < 0 ? Math.abs(canvasPos.x) : 0,
    rx: canvasPos.x > 0 ? Math.abs(canvasPos.x) : 0,
    ty: canvasPos.y < 0 ? Math.abs(canvasPos.y) : 0,
    by: canvasPos.y > 0 ? Math.abs(canvasPos.y) : 0,
    x: canvasPos.x,
    y: canvasPos.y,
  });

  if (canvasPos.x !== changes.current.x) {
    changes.current.lx =
      canvasPos.x < changes.current.lx
        ? Math.abs(canvasPos.x)
        : changes.current.lx;
    changes.current.rx =
      canvasPos.x > changes.current.rx
        ? Math.abs(canvasPos.x)
        : changes.current.rx;
    changes.current.x = canvasPos.x;
  }
  if (canvasPos.y !== changes.current.y) {
    changes.current.ty =
      canvasPos.y < changes.current.ty
        ? Math.abs(canvasPos.y)
        : changes.current.ty;
    changes.current.by =
      canvasPos.y > changes.current.by
        ? Math.abs(canvasPos.y)
        : changes.current.by;
    changes.current.y = canvasPos.y;
  }

  // BASE SIZE IS THE SCREEN AND IT'S THE CANVAS SIZE THAT'LL ADJUST TO COMPLEMENT THE CHANGE IN CANVASPOS
  // const base = {
  //   width: innerWidth + Math.abs(x);
  // }
  // const minWidth = innerWidth,
  //   minHeight = innerHeight;
  // const { x, y } = useCanvas((state) => state.canvasPos);
  // const minX = 0 - x;
  // const minY = 0 - y;
  // const totalWidth = innerWidth + Math.abs(x);
  // const totalHeight = innerHeight + Math.abs(y);
  const minimapSize = {
    width: 200,
    height: 150,
  };
  const canvasRatio = {
    x:
      minimapSize.width /
      (windowWidth + changes.current.lx + changes.current.rx),
    y:
      minimapSize.height /
      (innerHeight + changes.current.ty + changes.current.by),
  };

  const renderedCanvasSize = {
    width: canvasRatio.x * windowWidth,
    height: canvasRatio.y * innerHeight,
  };

  const renderedCanvasPos = {
    x: canvasRatio.x * canvasPos.x,
    y: canvasRatio.y * canvasPos.y,
  };

  const minimapRef = useRef<HTMLCanvasElement>(null);
  const ctx = minimapRef.current?.getContext("2d");

  const renderMovingCanvas = useCallback(() => {
    if (!ctx) return;
    ctx.clearRect(0, 0, minimapSize.width, minimapSize.height);
    ctx.strokeStyle = "red";
    ctx.fillStyle = "#333438";
    ctx.roundRect(0, 0, minimapSize.width, minimapSize.height, 15);
    ctx.fillRect(
      renderedCanvasPos.x,
      renderedCanvasPos.y,
      renderedCanvasSize.width,
      renderedCanvasSize.height
    );
    ctx.stroke();
  }, [minimapSize, renderedCanvasPos, renderedCanvasPos, ctx]);

  useEffect(() => {
    renderMovingCanvas();
  }, [canvasPos]); // Moving minimap

  useEffect(() => {
    if (!ctx) return;
    ctx.clearRect(0, 0, minimapSize.width, minimapSize.height);
    for (const id in loc) {
      if (Object.prototype.hasOwnProperty.call(loc, id)) {
        renderComp({ comp: drawing[id], loc: loc[id], ctx, canvasRatio });
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
  canvasRatio,
}: {
  comp: Drawings[0];
  loc: Location;
  ctx: CanvasRenderingContext2D;
  canvasRatio: { x: number; y: number };
}) {
  switch (comp.prop.type) {
    case "image":
    case "note":
    case "pencil":
    case "text": {
      let { x, y, width, height } = loc;

      x *= canvasRatio.x;
      width *= canvasRatio.x;
      y *= canvasRatio.x;
      height *= canvasRatio.x;
      // Generate random color
      ctx.fillStyle = "blue";
      ctx.fillRect(x, y, width, height);
      ctx.stroke();
      break;
    }
    case "arrow":
      let { startPos, endPos, qCurve } = comp.prop; // Immutable :(
      startPos = {
        x: startPos.x * canvasRatio.x,
        y: startPos.y * canvasRatio.y,
      };
      endPos = {
        x: endPos.x * canvasRatio.x,
        y: endPos.y * canvasRatio.y,
      };

      // Generate random color
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.moveTo(startPos.x, startPos.y);
      if (qCurve) {
        qCurve = {
          x: qCurve.x * canvasRatio.x,
          y: qCurve.y * canvasRatio.y,
        };
        ctx.quadraticCurveTo(qCurve.x, qCurve.y, endPos.x, endPos.y);
        ctx.moveTo(0, 0);
        ctx.closePath();
        ctx.stroke();
        return;
      }
      ctx.lineTo(endPos.x, endPos.y);
      ctx.moveTo(0, 0);
      ctx.closePath();
      ctx.stroke();
      break;
    case "pointer":
    case "shape": {
      let { x, y, width, height } = loc;

      x *= canvasRatio.x;
      width *= canvasRatio.x;
      y *= canvasRatio.x;
      height *= canvasRatio.x;
      // Generate random color
      ctx.strokeStyle = "blue";
      ctx.strokeRect(x, y, width, height);
      ctx.stroke();
      break;
    }
  }
}
