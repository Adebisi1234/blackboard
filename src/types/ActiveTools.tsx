export type Tools = {
  toolName: ToolName;
  toolElement: SVGSVGElement | HTMLDivElement;
  shape?: string;
};

export type ToolName =
  | "pencil"
  | "eraser"
  | "pointer"
  | "shapes"
  | "text"
  | "line"
  | "";

export type Colors =
  | "#f35353"
  | "#ff9b3c"
  | "#ffd335"
  | "#26c281"
  | "#2b90ef"
  | "#6a46fa"
  | "#b05dd9"
  | "#fff"
  | "#222";
