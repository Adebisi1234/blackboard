export type ActiveTool =
  | "pointer"
  | "hand"
  | "pencil"
  | "eraser"
  | "arrow"
  | "text"
  | "note"
  | "image"
  | "shape";

type Color =
  | "#ffffff"
  | "#9398b0"
  | "#e599f7"
  | "#ae3ec9"
  | "#4263eb"
  | "#4dabf7"
  | "#ffc034"
  | "#f76707"
  | "#099268"
  | "#40c057"
  | "#ff8787"
  | "#e03131";

export type General = {
  color: Color;
  opacity: number;
  strokeWidth: number;
  fill: "none" | "semi" | "solid" | "pattern";
  dash: "draw" | "solid" | "dashed" | "dotted";
  scale: number;
  font: 18 | 24 | 36 | 44;
  highlight: boolean;
  hovered: boolean;
};

export type Drawings<T = undefined> = ({
  id: number;
  prop: T extends "arrow"
    ? ArrowProp
    : T extends "image"
    ? ImageProp
    : T extends "note"
    ? NoteProp
    : T extends "pencil"
    ? PencilProp
    : T extends "pointer"
    ? PointerProp
    : T extends "text"
    ? TextProp
    : T extends "shapes"
    ? ShapesProp
    :
        | ArrowProp
        | ImageProp
        | NoteProp
        | PencilProp
        | PointerProp
        | TextProp
        | ShapesProp;
  pos: Partial<Location>;
} & (T extends "image" | undefined ? Partial<General> : General))[];

export type Location = {
  x: number;
  y: number;
  width: number;
  id: number;
  height: number;
};

export type ShapesProp = {
  type: "shape";
};

export type TextProp = {
  type: "text";
  value?: string | undefined;
};

export type PointerProp = {
  startPos: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  type: "pointer";
  pos: {
    x: number;
    y: number;
  };
};

export type PencilProp = {
  path: (
    | {
        func: "M";
        x: number;
        y: number;
      }
    | {
        func: "L";
        x: number;
        y: number;
      }
  )[];
  type: "pencil";
};
export type NoteProp = {
  type: "note";
  value?: string | undefined;
};

export type ArrowProp = {
  startPos: {
    x: number;
    y: number;
  };
  endPos: {
    x: number;
    y: number;
  };
  angle: number;
  type: "arrow";
};
export type ImageProp = {
  src: string;
  type: "image";
  alt: string;
  width: number;
  height: number;
};

export type ImageType = {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
};
