import { createContext } from "react";
export interface Tools {
  toolName: string;
  toolElement: HTMLDivElement;
}

const ActiveTools = createContext<Tools>(null!);

export default ActiveTools;
