import Arrow from "../components/drawings/Arrow";
import Text from "../components/drawings/Text";
import Image from "../components/drawings/Image";
import Note from "../components/drawings/Note";
import Pencil from "../components/drawings/Pencil";
import Pointer from "../components/drawings/Pointer";
import Shapes from "../components/drawings/Shapes";
import type {
  General,
  Drawings,
  ActiveTool,
  ImageType,
} from "../types/general";

import { getDiff } from "./math";
import { produce } from "immer";

type ModifyDrawing = {
  e: { clientX: number; clientY: number };
  drawingId: React.MutableRefObject<number>;
  drawing: Drawings;
  setDrawing?: (payload: Drawings[0]) => void;
  updateDrawing?: (id: number, payload: Drawings[0]) => void;
  general: General;
  activeTool: ActiveTool;
  clearPointer?: (id: number) => void;
};

export function addDrawing({
  e,
  drawingId,
  activeTool,
  setDrawing,
  general,
}: ModifyDrawing) {
  switch (activeTool) {
    case "hand":
    case "eraser":
      break;
    case "arrow": {
      const newArrowComp = {
        ...general,
        prop: {
          startPos: {
            x: e.clientX,
            y: e.clientY,
          },
          endPos: {
            x: e.clientX,
            y: e.clientY,
          },
          type: "arrow",
        },
        id: drawingId.current,
        pos: {
          x: 0,
          y: 0,
        },
      } satisfies Drawings<"arrow">[0];
      setDrawing!(newArrowComp);
      break;
    }

    case "pencil": {
      const newPencilComp = {
        id: drawingId.current,
        ...general,
        prop: {
          type: "pencil",
          path: [
            {
              func: "M",
              x: e.clientX,
              y: e.clientY,
            },
          ],
        },
        pos: {
          x: 0,
          y: 0,
        },
      } satisfies Drawings<"pencil">[0];
      setDrawing!(newPencilComp);
      break;
    }

    case "pointer": {
      const newPointerComp = {
        id: drawingId.current,
        ...general,
        prop: {
          type: "pointer",
          startPos: {
            x: e.clientX,
            y: e.clientY,
          },
          pos: {
            x: e.clientX,
            y: e.clientY,
          },
          width: 0,
          height: 0,
        },
        pos: {
          x: e.clientX,
          y: e.clientY,
        },
      } satisfies Drawings<"pointer">[0];
      setDrawing!(newPointerComp);
      break;
    }
    case "text": {
      const newTextComp = {
        id: drawingId.current,
        ...general,
        prop: {
          type: "text",
          value: "",
        },
        pos: {
          x: e.clientX,
          y: e.clientY,
        },
      } satisfies Drawings<"text">[0];
      setDrawing!(newTextComp);
      break;
    }
    case "note": {
      const newNoteComp = {
        ...general,
        id: drawingId.current,
        pos: {
          x: e.clientX,
          y: e.clientY,
        },
        prop: {
          type: "note",
          value: "",
        },
      } satisfies Drawings<"note">[0];
      setDrawing!(newNoteComp);
      break;
    }
    case "image": {
      break;
    }
    case "shape": {
      const newShapeComp = {
        id: drawingId.current,
        ...general,
        prop: {
          type: "shape",
          startPos: {
            x: e.clientX,
            y: e.clientY,
          },
          pos: {
            x: e.clientX,
            y: e.clientY,
          },
          width: 0,
          height: 0,
        },
        pos: {
          x: 0,
          y: 0,
        },
      } satisfies Drawings<"shape">[0];
      setDrawing!(newShapeComp);
      break;
    }
    default: {
      console.log(
        `Error occurred: ${{
          e: e,
          activeTool: activeTool,
          id: drawingId.current,
          general: general,
        }}`
      );
    }
  }
}

export function modifyDrawing({
  e,
  drawingId,
  activeTool,
  drawing,
  updateDrawing,
  general,
}: ModifyDrawing) {
  if (!drawing[drawingId.current]) return;
  switch (activeTool) {
    case "hand":
    case "eraser":
      break;
    case "pointer": {
      const edit = produce(
        drawing[drawingId.current] as Drawings<"pointer">[0],
        (draft) => {
          if (e.clientX < draft.prop.startPos.x) {
            draft.prop.pos.x =
              draft.prop.startPos.x - getDiff(draft.prop.startPos.x, e.clientX);
            draft.prop.width = getDiff(draft.prop.startPos.x, e.clientX);
          } else {
            draft.prop.width = e.clientX - draft.prop.pos.x;
          }
          if (e.clientY < draft.prop.startPos.y) {
            draft.prop.pos.y =
              draft.prop.startPos.y - getDiff(draft.prop.startPos.y, e.clientY);
            draft.prop.height = getDiff(draft.prop.startPos.y, e.clientY);
          } else {
            draft.prop.height = e.clientY - draft.prop.pos.y;
          }
        }
      );
      updateDrawing!(drawingId.current, edit);

      // The magic
      break;
    }

    case "pencil": {
      const edit = produce(
        drawing[drawingId.current] as Drawings<"pencil">[0],
        (draft) => {
          draft.prop.path.push(
            { func: "L", x: e.clientX, y: e.clientY },
            { func: "M", x: e.clientX, y: e.clientY }
          );
        }
      );

      updateDrawing!(drawingId.current, edit);

      break;
    }

    case "arrow": {
      const edit = produce(
        drawing[drawingId.current] as Drawings<"arrow">[0],
        (draft) => {
          draft.prop.endPos = {
            x: e.clientX,
            y: e.clientY,
          };
        }
      );
      updateDrawing!(drawingId.current, edit);
      break;
    }
    case "text": {
      const edit = produce(
        drawing[drawingId.current] as Drawings<"text">[0],
        (draft) => {
          draft.pos = {
            ...draft.pos,
            x: e.clientX,
            y: e.clientY,
          };
        }
      );
      updateDrawing!(drawingId.current, edit);
      break;
    }
    case "note": {
      const edit = produce(
        drawing[drawingId.current] as Drawings<"note">[0],
        (draft) => {
          draft.pos = {
            ...draft.pos,
            x: e.clientX,
            y: e.clientY,
          };
        }
      );
      updateDrawing!(drawingId.current, edit);
      break;
    }
    case "image": {
      const edit = produce(
        drawing[drawingId.current] as Drawings<"image">[0],
        (draft) => {
          draft.pos = {
            ...draft.pos,
            x: e.clientX,
            y: e.clientY,
            //Width and Height
          };
        }
      );
      updateDrawing!(drawingId.current, edit);

      break;
    }
    case "shape": {
      const edit = produce(
        drawing[drawingId.current] as Drawings<"shape">[0],
        (draft) => {
          if (e.clientX < draft.prop.startPos.x) {
            draft.prop.pos.x =
              draft.prop.startPos.x - getDiff(draft.prop.startPos.x, e.clientX);
            draft.prop.width = getDiff(draft.prop.startPos.x, e.clientX);
          } else {
            draft.prop.width = e.clientX - draft.prop.pos.x;
          }
          if (e.clientY < draft.prop.startPos.y) {
            draft.prop.pos.y =
              draft.prop.startPos.y - getDiff(draft.prop.startPos.y, e.clientY);
            draft.prop.height = getDiff(draft.prop.startPos.y, e.clientY);
          } else {
            draft.prop.height = e.clientY - draft.prop.pos.y;
          }
        }
      );
      updateDrawing!(drawingId.current, edit);
      break;
    }
    default: {
      console.log(
        `Error occurred: ${{
          e: e,
          activeTool: activeTool,
          id: drawingId.current,
          general: general,
        }}`
      );
    }
  }
}

export function cleanUpDrawing({
  drawing,
  clearPointer,
}: Pick<ModifyDrawing, "drawing" | "clearPointer">) {
  if (drawing[drawing.length - 1]?.prop?.type === "pointer") {
    clearPointer!(drawing.length - 1);
  }
}
export function drawOnCanvas(comp: Drawings[0]) {
  if (!comp || !comp.prop) {
    return;
  }
  switch (comp.prop.type) {
    case "arrow": {
      return <Arrow key={comp.id} {...(comp as Drawings<"arrow">[0])} />;
    }

    case "image": {
      return <Image key={comp.id} {...(comp as Drawings<"image">[0])} />;
    }
    case "note": {
      return <Note key={comp.id} {...(comp as Drawings<"note">[0])} />;
    }
    case "pencil": {
      return <Pencil key={comp.id} {...(comp as Drawings<"pencil">[0])} />;
    }
    case "pointer": {
      return (
        <Pointer
          key={comp.id * Math.random() * 20 + Math.random()}
          {...(comp as Drawings<"pointer">[0])}
        />
      );
    }
    case "shape": {
      return <Shapes key={comp.id} {...(comp as Drawings<"shape">[0])} />;
    }
    case "text": {
      return <Text key={comp.id} {...(comp as Drawings<"text">[0])} />;
    }
    default:
      console.log(`Error in component:`, comp);
  }
}

export function removeComp(id: number, hideComp: (id: number) => void) {
  if (id === -1) return;
  hideComp(id);
}

export function cloneComp(comp: Drawings[0]) {
  const clone = { ...comp };
  switch (clone.prop.type) {
    case "image":
      clone.prop.x += 20;
      clone.prop.y += 20;
      break;
    case "arrow":
      clone.prop.startPos.x += 20;
      clone.prop.startPos.y += 20;
      clone.prop.endPos.x += 20;
      clone.prop.endPos.y += 20;
      if (clone.prop.qCurve) {
        clone.prop.qCurve.x += 20;
        clone.prop.qCurve.y += 20;
      }
      break;
    case "text":
    case "note":
      clone.pos.x ? (clone.pos.x += 20) : (clone.pos.x = 20);
      clone.pos.y ? (clone.pos.y += 20) : (clone.pos.y = 20);
      break;
    case "pencil":
      clone.prop.path = clone.prop.path.map((prop) => {
        prop.x += 20;
        prop.y += 20;
        return prop;
      });
      break;

    case "shape":
      clone.prop.pos.x += 20;
      clone.prop.pos.y += 20;
  }
  return clone;
}

export function generateImage(
  file: File,
  setImage: (payload: ImageType) => void
) {
  const img = document.createElement("img");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  img.src = URL.createObjectURL(file);
  img.addEventListener("load", () => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx?.drawImage(img, 0, 0);
    const src = canvas.toDataURL();
    setImage({
      id: file.lastModified,
      src: src,
      alt: "Image uploaded by user",
      width: img.naturalWidth,
      height: img.naturalHeight,
    });
  });
}
