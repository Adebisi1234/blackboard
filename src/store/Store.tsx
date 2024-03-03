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
}

interface ImageState {
  image: ImageType | undefined;
  setImage: (payload: ImageState["image"]) => void;
  clearImage: () => void;
}

interface GeneralState {
  general: General;
  setGeneral: (payload: Partial<General>) => void;
}

interface LocationState {
  location: Location[];
  setLocation: (payload: Location) => void;
}
interface HighlightedState {
  highlighted: number[];
  setHighlighted: (payload: number[]) => void;
  reset: () => void;
}
interface ActiveToolState {
  activeTool: ActiveTool;
  setActiveTool: (payload: ActiveTool) => void;
}

interface Canvas {
  canvasPos: {
    x: number;
    y: number;
  };
  canvasRef: HTMLDivElement | undefined;
  setRef: (ref: HTMLDivElement) => void;
}

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
}));

export const useGeneral = create<GeneralState>((set) => ({
  general: {
    color: "#ffffff",
    opacity: 1,
    strokeWidth: 3,
    dash: "solid",
    fill: "none",
    scale: 1,
    highlight: false,
    font: 24,
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
  reset() {
    set((state) => {
      console.log(state);
      state.highlighted = [];
      return state;
    });
  },
}));

export const useLocation = create<LocationState>((set) => ({
  location: [],
  setLocation: (payload: Location) =>
    set(
      (state: LocationState) => ({
        location: [...state.location, payload],
      }),
      true
    ),
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
}));

export const useImage = create<ImageState>((set) => ({
  image: undefined,
  setImage(payload) {
    set({
      image: payload,
    });
  },
  clearImage() {
    set({
      image: undefined,
    });
  },
}));
