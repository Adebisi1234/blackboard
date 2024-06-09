import {
  useActive,
  useCanvas,
  useDrawing,
  useLocation,
} from "../../../store/Store";
import { Location } from "../../../types/general";
import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";

export default function ZoomDialog() {
  const [scale, setScale] = useDrawing((s) => [s.scale, s.setScale]);
  const [canvasPos, setCanvasPos] = useCanvas((s) => [
    s.canvasPos,
    s.setCanvasPos,
  ]);
  const loc = useLocation((s) => s.location);
  const activeComp = useActive((s) => {
    if (typeof s.activeComp === "number") {
      console.log(loc[s.activeComp]);
      return loc[s.activeComp];
    } else if (Array.isArray(s.activeComp)) {
      // const r: Location = {
      //   x: 0,
      //   y: 0,
      //   width: 0,
      //   height: 0,
      //   id: s.activeComp[0],
      // }!;
      // let diff = { x: 0, y: 0 };
      // s.activeComp.forEach((id) => {
      //   const comp = loc[id];
      //   if (comp) {
      //     if (comp.x < r.x) {
      //       r.x = comp.x;
      //       diff.x += r.x - comp.x;
      //     } else {
      //       diff.x += -r.x + comp.x;
      //     }
      //     if (comp.y < r.y) {
      //       r.y = comp.y;
      //       diff.y += r.y - comp.y;
      //     } else {
      //       diff.y += -r.y + comp.y;
      //     }
      //     r.width += comp.width;
      //     r.height += comp.height;
      //   }
      // });
      // r.width -= diff.x;
      // r.height -= diff.y;
      return loc[s.activeComp[0]];
      // s.activeComp.reduce((prev, curr, i) => {
      //   if(loc[prev].x)
      // })
    }
  });
  return (
    <DialogContainer className="w-48" title="Mobile zoom">
      <DialogItem
        className={`${scale === 2 ? "cursor-not-allowed opacity-60" : ""}`}
        onClick={() => setScale(Math.min(2, scale + 0.25))}
      >
        <span>Zoom in</span>
        <kbd>Ctrl =</kbd>
      </DialogItem>
      <DialogItem
        className={`${scale === 0.25 ? "cursor-not-allowed opacity-60" : ""}`}
        onClick={() => setScale(Math.max(0.25, scale - 0.25))}
      >
        <span>Zoom out</span>
        <kbd>Ctrl -</kbd>
      </DialogItem>
      <DialogItem onClick={() => setScale(1)}>
        <span>Zoom to 100%</span>
        <kbd> Shift 0</kbd>
      </DialogItem>
      <DialogItem onClick={() => setScale(1)}>
        <span>Zoom to fit</span>
        <kbd>Shift 1</kbd>
      </DialogItem>
      <DialogItem
        onClick={() => {
          if (activeComp) {
            zoomToSelection(
              scale,
              activeComp,
              canvasPos,
              setScale,
              setCanvasPos
            );
          }
        }}
      >
        <span>Zoom to selection</span>
        <kbd>Shift 2</kbd>
      </DialogItem>
    </DialogContainer>
  );
}

function zoomToSelection(
  scale: number,
  loc: Location,
  canvasPos: { x: number; y: number },
  setScale: (payload: number) => void,
  setCanvasPos: (payload: { x: number; y: number }) => void
) {
  const newPos = {
    x: canvasPos.x - loc.x,
    y: canvasPos.y - loc.y,
  };
  setCanvasPos(newPos);
  const newScale =
    Math.round(
      Math.sqrt(((innerWidth / loc.width) * innerHeight) / loc.height) / 0.25
    ) * 0.25; //Random calc :>

  setScale(Math.max(0.25, Math.min(2, newScale)));
}
