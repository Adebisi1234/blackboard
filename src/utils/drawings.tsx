import Arrow from "../components/drawings/Arrow";
import Text from "../components/drawings/Text";
import Image from "../components/drawings/Image";
import Note from "../components/drawings/Note";
import Pencil from "../components/drawings/Pencil";
import Pointer from "../components/drawings/Pointer";
import Shapes from "../components/drawings/Shapes";
import {
  General,
  type ImageType,
  type Drawings,
  ActiveTool,
} from "../types/general";
import { Ref } from "react";

import { getDiff, getRelativeMin } from "./math";

type ModifyDrawing = {
  e: { clientX: number; clientY: number };
  drawingId: React.MutableRefObject<number>;
  drawing: Drawings;
  setDrawing?: (payload: Drawings[0]) => void;
  updateDrawing?: (id: number, payload: Drawings[0]) => void;
  general: General;
  image?: ImageType;
  clearImage?: () => void;
  activeTool: ActiveTool;
  clearPointer?: (id: number) => void;
};

export function addDrawing({
  e,
  drawingId,
  activeTool,
  setDrawing,
  general,
  image,
  clearImage,
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
          x: e.clientX,
          y: e.clientY,
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
          x: e.clientX,
          y: e.clientY,
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
          width: 4,
          height: 4,
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
          x: e.clientX,
          y: e.clientY,
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
  switch (activeTool) {
    case "hand":
    case "eraser":
      break;
    case "pointer": {
      if (
        !drawing[drawingId.current] ||
        drawing[drawingId.current].prop.type !== "pointer"
      ) {
        console.log(drawingId.current);
        break;
      }

      const edit = { ...drawing[drawingId.current] } as Drawings<"pointer">[0];
      if (e.clientX < edit.prop.startPos.x) {
        edit.prop.pos.x =
          edit.prop.startPos.x - getDiff(edit.prop.startPos.x, e.clientX);
        edit.prop.width = getDiff(edit.prop.startPos.x, e.clientX);
      } else {
        edit.prop.width = e.clientX - edit.prop.pos.x;
      }
      if (e.clientY < edit.prop.startPos.y) {
        edit.prop.pos.y =
          edit.prop.startPos.y - getDiff(edit.prop.startPos.y, e.clientY);
        edit.prop.height = getDiff(edit.prop.startPos.y, e.clientY);
      } else {
        edit.prop.height = e.clientY - edit.prop.pos.y;
      }
      updateDrawing!(drawingId.current, edit);

      // The magic
      break;
    }

    case "pencil": {
      if (!drawing[drawingId.current]) {
        break;
      }
      const edit = { ...drawing[drawingId.current] } as Drawings<"pencil">[0];
      edit.prop.path = [
        ...edit.prop.path,
        { func: "L", x: e.clientX, y: e.clientY },
        { func: "M", x: e.clientX, y: e.clientY },
      ];

      updateDrawing!(drawingId.current, edit);

      break;
    }

    case "arrow": {
      if (!drawing[drawingId.current]) {
        break;
      }
      const edit = { ...drawing[drawingId.current] } as Drawings<"arrow">[0];
      edit.prop.endPos = {
        x: e.clientX,
        y: e.clientY,
      };
      edit.pos = {
        x: getRelativeMin(edit.prop.startPos.x, edit.prop.endPos.x),
        y: getRelativeMin(edit.prop.startPos.y, edit.prop.endPos.y),
        width: getDiff(edit.prop.startPos.x, edit.prop.endPos.x),
        height: getDiff(edit.prop.startPos.y, edit.prop.endPos.y),
      };
      updateDrawing!(drawingId.current, edit);
      break;
    }
    case "text": {
      if (!drawing[drawingId.current]) {
        break;
      }
      const edit = { ...drawing[drawingId.current] } as Drawings<"text">[0];
      edit.pos = {
        ...edit.pos,
        x: e.clientX,
        y: e.clientY,
      };
      updateDrawing!(drawingId.current, edit);
      break;
    }
    case "note": {
      if (!drawing[drawingId.current]) {
        break;
      }
      const edit = { ...drawing[drawingId.current] } as Drawings<"note">[0];
      edit.pos = {
        ...edit.pos,
        x: e.clientX,
        y: e.clientY,
      };
      updateDrawing!(drawingId.current, edit);
      break;
    }
    case "image": {
      if (!drawing[drawingId.current]) {
        break;
      }
      const edit = { ...drawing[drawingId.current] } as Drawings<"image">[0];
      edit.pos = {
        ...edit.pos,
        x: e.clientX,
        y: e.clientY,
        //Width and Height
      };
      updateDrawing!(drawingId.current, edit);

      break;
    }
    case "shape": {
      const edit = { ...drawing[drawingId.current] } as Drawings<"shape">[0];
      if (e.clientX < edit.prop.startPos.x) {
        edit.prop.pos.x =
          edit.prop.startPos.x - getDiff(edit.prop.startPos.x, e.clientX);
        edit.prop.width = getDiff(edit.prop.startPos.x, e.clientX);
      } else {
        edit.prop.width = e.clientX - edit.prop.pos.x;
      }
      if (e.clientY < edit.prop.startPos.y) {
        edit.prop.pos.y =
          edit.prop.startPos.y - getDiff(edit.prop.startPos.y, e.clientY);
        edit.prop.height = getDiff(edit.prop.startPos.y, e.clientY);
      } else {
        edit.prop.height = e.clientY - edit.prop.pos.y;
      }
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
  e,
  drawingId,
  activeTool,
  drawing,
  clearPointer,
}: ModifyDrawing) {
  if (drawing[drawing.length - 1].prop?.type === "pointer") {
    clearPointer!(drawing.length - 1);
  }
}
export function drawOnCanvas(comp: Drawings[0]) {
  if (!comp) {
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
