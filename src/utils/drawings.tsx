import Arrow, { type ArrowProp } from "../components/drawings/Arrow";
import Text, { type TextProp } from "../components/drawings/Text";
import Image, { type ImageProp } from "../components/drawings/Image";
import Note, { type NoteProp } from "../components/drawings/Note";
import Pencil, { type PencilProp } from "../components/drawings/Pencil";
import Eraser, { type EraserProp } from "../components/drawings/Eraser";
import Hand, { type HandProp } from "../components/drawings/Hand";
import Pointer, { type PointerProp } from "../components/drawings/Pointer";
import Shapes, { type ShapesProp } from "../components/drawings/Shapes";
import { type Drawings } from "../types/general";
import { type ActiveTool, type General } from "../types/general";
import { Ref } from "react";

type ModifyDrawing = {
  e: React.MouseEvent<HTMLDivElement, MouseEvent>;
  activeTool: ActiveTool;
  setDrawing: React.Dispatch<React.SetStateAction<Drawings>>;
  drawingId: React.MutableRefObject<number>;
  general: General;
};

export function addDrawing({
  e,
  activeTool,
  setDrawing,
  drawingId,
  general,
}: ModifyDrawing) {
  switch (activeTool) {
    case "pointer": {
      setDrawing((prev) => {
        const temp = [...prev];
        temp[drawingId.current] = {
          type: "pointer",
          height: 0,
          highlight: true,
          pos: {
            x: e.clientX,
            y: e.clientY,
          },
          startPos: {
            x: e.clientX,
            y: e.clientY,
          },
          strokeWidth: 3,
          width: 0,
          id: drawingId.current,
        } satisfies PointerProp;
        return temp;
      });
      // The magic
      break;
    }
    case "hand": {
      setDrawing((prev) => {
        const temp = [...prev];
        temp[drawingId.current] = {
          type: "hand",
          id: drawingId.current,
        } satisfies HandProp;
        return temp;
      });
      break;
    }
    case "pencil": {
      setDrawing((prev) => {
        const temp = [...prev];
        temp[drawingId.current] = {
          color: general.color,
          id: drawingId.current,
          path: [
            {
              func: "M",
              x: e.clientX,
              y: e.clientY,
            },
          ],
          opacity: general.opacity,
          dash: general.dash,
          scale: 1,
          type: "pencil",
        } satisfies PencilProp;
        return temp;
      });
      break;
    }
    case "eraser": {
      setDrawing((prev) => {
        const temp = [...prev];
        temp[drawingId.current] = {
          type: "eraser",
          id: drawingId.current,
        } satisfies EraserProp;
        return temp;
      });
      break;
    }
    case "arrow": {
      setDrawing((prev) => {
        const temp = [...prev];
        temp[drawingId.current] = {
          id: drawingId.current,
          type: "arrow",
          color: general.color,
          startPos: {
            x: e.clientX,
            y: e.clientY,
          },
          endPos: {
            x: e.clientX,
            y: e.clientY,
          },
          opacity: general.opacity,
        } satisfies ArrowProp;
        return temp;
      });
      break;
    }
    case "text": {
      setDrawing((prev) => {
        const temp = [...prev];
        temp[drawingId.current] = {
          id: drawingId.current,
          type: "text",
          color: general.color,
          pos: {
            x: e.clientX,
            y: e.clientY,
          },
          opacity: general.opacity,
          font: general.font,
        } satisfies TextProp;
        return temp;
      });
      break;
    }
    case "note": {
      setDrawing((prev) => {
        const temp = [...prev];
        temp[drawingId.current] = {
          color: general.color,
          id: drawingId.current,
          pos: {
            x: e.clientX,
            y: e.clientY,
          },
          opacity: general.opacity,
          type: "note",
          font: general.font,
        } satisfies NoteProp;
        return temp;
      });
      break;
    }
    case "image": {
      setDrawing((prev) => {
        const temp = [...prev];
        temp[drawingId.current] = {
          type: "image",
          src:
            getImage({ image: general.image, id: drawingId.current })?.src ??
            "",
          alt:
            getImage({ image: general.image, id: drawingId.current })?.alt ??
            "",
          pos: {
            x: e.clientX,
            y: e.clientY,
          },
          width:
            getImage({ image: general.image, id: drawingId.current })?.width ??
            0,
          height:
            getImage({ image: general.image, id: drawingId.current })?.height ??
            0,
          opacity: general.opacity,
          id: drawingId.current,
        } satisfies ImageProp;
        return temp;
      });
      break;
    }
    case "shape": {
      setDrawing((prev) => {
        const temp = [...prev];
        temp[drawingId.current] = {
          type: "shape",
          id: drawingId.current,
        } satisfies ShapesProp;
        return temp;
      });
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
  activeTool,
  setDrawing,
  drawingId,
  general,
}: ModifyDrawing) {
  switch (activeTool) {
    case "pointer": {
      setDrawing((prev) => {
        const temp = [...prev];
        if (!temp[drawingId.current]) {
          return temp;
        }
        const edit = { ...temp[drawingId.current] } as PointerProp;
        if (e.clientX < edit.startPos.x) {
          edit.pos.x = edit.startPos.x - getDiff(edit.startPos.x, e.clientX);
          edit.width = getDiff(edit.startPos.x, e.clientX);
        } else {
          edit.width = e.clientX - edit.pos.x;
        }
        if (e.clientY < edit.startPos.y) {
          edit.pos.y = edit.startPos.y - getDiff(edit.startPos.y, e.clientY);
          edit.height = getDiff(edit.startPos.y, e.clientY);
        } else {
          edit.height = e.clientY - edit.pos.y;
        }
        temp[drawingId.current] = edit;
        return temp;
      });
      // The magic
      break;
    }
    case "hand": {
      // setDrawing((prev) => {
      //   const temp = [...prev];
      //   return temp;
      // });
      break;
    }
    case "pencil": {
      setDrawing((prev) => {
        const temp = [...prev];
        if (!temp[drawingId.current]) {
          return temp;
        }
        const edit = { ...temp[drawingId.current] } as PencilProp;
        edit.path = [
          ...edit.path,
          { func: "L", x: e.clientX, y: e.clientY },
          { func: "M", x: e.clientX, y: e.clientY },
        ];
        temp[drawingId.current] = edit;
        return temp;
      });
      break;
    }
    case "eraser": {
      // setDrawing((prev) => {
      //   const temp = [...prev];
      //   return temp;
      // });
      break;
    }
    case "arrow": {
      setDrawing((prev) => {
        const temp = [...prev];
        if (!temp[drawingId.current]) {
          return temp;
        }
        const edit = { ...temp[drawingId.current] } as ArrowProp;
        edit.endPos = {
          x: e.clientX,
          y: e.clientY,
        };
        temp[drawingId.current] = edit;
        return temp;
      });
      break;
    }
    case "text": {
      // setDrawing((prev) => {
      //   const temp = [...prev];
      //   return temp;
      // });
      break;
    }
    case "note": {
      // setDrawing((prev) => {
      //   const temp = [...prev];
      //   return temp;
      // });
      break;
    }
    case "image": {
      setDrawing((prev) => {
        const temp = [...prev];
        if (!temp[drawingId.current]) {
          return temp;
        }
        const edit = { ...temp[drawingId.current] } as ImageProp;
        edit.pos = {
          x: e.clientX,
          y: e.clientY,
        };
        return temp;
      });
      break;
    }
    case "shape": {
      // setDrawing((prev) => {
      //   const temp = [...prev];
      //   return temp;
      // });
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
  activeTool,
  setDrawing,
  drawingId,
  general,
}: ModifyDrawing) {
  switch (activeTool) {
    case "pointer": {
      setDrawing((prev) => {
        const temp = [...prev];
        if (!temp[drawingId.current]) {
          return temp;
        }
        temp.splice(drawingId.current, 1);
        return temp;
      });
      break;
    }
    // case "hand": {
    //   break;
    // }
    // case "pencil": {
    //   break;
    // }
    // case "eraser": {
    //   break;
    // }
    // case "arrow": {
    //   break;
    // }
    // case "text": {
    //   break;
    // }
    // case "note": {
    //   break;
    // }
    // case "image": {
    //   break;
    // }
    // case "shape": {
    //   break;
    // }
    // default: {
    //   break;
    // }
  }
}
export function drawOnCanvas(
  comp: Drawings[0],
  activeCompRef: React.MutableRefObject<HTMLElement | SVGSVGElement | null>
) {
  if (!comp) {
    return;
  }
  switch (comp.type) {
    case "arrow": {
      return (
        <Arrow
          ref={activeCompRef as Ref<SVGSVGElement>}
          key={comp.id}
          {...(comp satisfies ArrowProp)}
        />
      );
    }
    case "eraser": {
      return <Eraser key={comp.id} {...comp} />;
    }
    case "hand": {
      return <Hand key={comp.id} />;
    }
    case "image": {
      return (
        <Image
          ref={activeCompRef as Ref<HTMLDivElement>}
          key={comp.id}
          {...(comp satisfies ImageProp)}
        />
      );
    }
    case "note": {
      return (
        <Note
          ref={activeCompRef as Ref<HTMLDivElement>}
          key={comp.id}
          {...(comp satisfies NoteProp)}
        />
      );
    }
    case "pencil": {
      return (
        <Pencil
          ref={activeCompRef as Ref<SVGSVGElement>}
          key={comp.id}
          {...(comp satisfies PencilProp)}
        />
      );
    }
    case "pointer": {
      return <Pointer key={comp.id} {...(comp satisfies PointerProp)} />;
    }
    case "shape": {
      return <Shapes key={comp.id} />;
    }
    case "text": {
      return (
        <Text
          ref={activeCompRef as Ref<HTMLTextAreaElement>}
          key={comp.id}
          {...(comp satisfies TextProp)}
        />
      );
    }
    default:
      console.log(`Error on component`, comp);
  }
}

type GetImageProp = {
  image: {
    id: number;
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  id: number;
};
function getImage({ image, id }: GetImageProp) {
  if (!image) return;
  return image.find((img) => img.id === id);
}

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
