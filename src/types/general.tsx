import { type ArrowProp } from "../components/drawings/Arrow";
import { type ImageProp } from "../components/drawings/Image";
import { type NoteProp } from "../components/drawings/Note";
import { type PencilProp } from "../components/drawings/Pencil";
import { type PointerProp } from "../components/drawings/Pointer";
import { type TextProp } from "../components/drawings/Text";
import { type ShapesProp } from "../components/drawings/Shapes";
import { type EraserProp } from "../components/drawings/Eraser";
import { type HandProp } from "../components/drawings/Hand";

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
  image: {
    id: number;
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
};

export type Drawings = (
  | ArrowProp
  | ImageProp
  | NoteProp
  | PencilProp
  | PointerProp
  | TextProp
  | ShapesProp
  | EraserProp
  | HandProp
)[];
export type Location = {
  x: number;
  y: number;
  width: number;
  height: number;
  id: number;
};
