import { create } from "zustand";
import {
  ActiveTool,
  Drawings,
  Location,
  General,
  ImageType,
} from "../types/general";

//TODO= IMPLEMENT IMMER

interface DrawingState {
  drawing: Drawings;
  setDrawing: (payload: Drawings[0]) => void;
  updateDrawing: (id: number, payload: Drawings[0]) => void;
  clearPointer: (id: number) => void;
  hideComp: (id: number) => void;
  toggleHighlight: (id: number) => void;
  highlightComp: (id: number) => void;
  hoverComp: (id: number) => void;
  leaveComp: (id: number) => void;
}

interface ImageState {
  image: ImageType | undefined;
  setImage: (payload: ImageState["image"]) => void;
}

interface GeneralState {
  general: General;
  setGeneral: (payload: Partial<General>) => void;
}

interface LocationState {
  location: { [key: number]: Location };
  setLocation: (payload: Location) => void;
}
interface HighlightedState {
  highlighted: number[];
  setHighlighted: (payload: number[]) => void;
}
interface ActiveToolState {
  activeTool: ActiveTool;
  setActiveTool: (payload: ActiveTool) => void;
}

interface ActiveCompState {
  activeComp: number[];
  setActiveComp: (payload: number | number[]) => void;
}

interface Canvas {
  canvasPos: {
    x: number;
    y: number;
  };
  canvasRef: HTMLDivElement | undefined;
  setRef: (ref: HTMLDivElement) => void;
  setCanvasPos: (payload: { x: number; y: number }) => void;
}

export const useActive = create<ActiveCompState>((set) => ({
  activeComp: [],
  setActiveComp(payload) {
    set(() => ({
      activeComp: typeof payload === "number" ? [payload] : payload,
    }));
  },
}));

export const useDrawing = create<DrawingState>((set) => ({
  drawing: [],
  setDrawing: (payload: Drawings[0]) =>
    set((state: DrawingState) => ({
      drawing: [...state.drawing, payload],
    })),
  updateDrawing(id, payload) {
    set((state) => ({
      drawing: [
        ...state.drawing.slice(0, id),
        payload,
        ...state.drawing.slice(id + 1),
      ],
    }));
  },
  clearPointer(id) {
    set(({ drawing }) => {
      const temp = [...drawing];
      temp.splice(id, 1);
      console.log({ temp });
      return { drawing: temp };
    });
  },
  hideComp(id) {
    set(({ drawing }) => {
      const temp = [...drawing];
      temp[id].opacity = 0;
      return { drawing: temp };
    });
  },
  toggleHighlight(id) {
    set(({ drawing }) => {
      const temp = [...drawing];
      temp[id].highlight = false;
      return { drawing: temp };
    });
  },
  highlightComp(id) {
    set(({ drawing }) => {
      const temp = [...drawing];
      temp[id].highlight = true;
      return { drawing: temp };
    });
  },
  hoverComp(id) {
    set(({ drawing }) => {
      const temp = [...drawing];
      temp[id].hovered = true;
      return { drawing: temp };
    });
  },
  leaveComp(id) {
    set(({ drawing }) => {
      const temp = [...drawing];
      temp[id].hovered = false;
      return { drawing: temp };
    });
  },
}));

export const useGeneral = create<GeneralState>((set) => ({
  general: {
    color: "#ffffff",
    opacity: 1,
    strokeWidth: 3,
    dash: 0,
    fill: 0,
    scale: 1,
    highlight: false,
    font: 24,
    hovered: false,
  },
  setGeneral(payload) {
    set((state) => ({
      general: {
        ...state.general,
        ...payload,
      },
    }));
  },
}));

export const useHighlighted = create<HighlightedState>((set) => ({
  highlighted: [],
  setHighlighted(payload: number[]) {
    set((state: HighlightedState) => {
      state.highlighted = payload;
      return state;
    });
  },
}));

export const useLocation = create<LocationState>((set) => ({
  location: {},
  setLocation: (payload: Location) =>
    set((state: LocationState) => ({
      location: { ...state.location, [payload.id]: payload },
    })),
}));

export const useActiveTool = create<ActiveToolState>((set) => ({
  activeTool: "pencil",
  setActiveTool: (payload) =>
    set({
      activeTool: payload,
    }),
}));

export const useCanvas = create<Canvas>((set) => ({
  canvasPos: {
    x: 0,
    y: 0,
  },
  canvasRef: undefined,
  setRef(ref) {
    set({
      canvasRef: ref,
    });
  },
  setCanvasPos(payload) {
    set({
      canvasPos: { ...payload },
    });
  },
}));

export const useImage = create<ImageState>((set) => ({
  image: undefined,
  setImage(payload) {
    set({
      image: payload,
    });
  },
}));
